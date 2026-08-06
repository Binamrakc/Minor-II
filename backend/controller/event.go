package controller

import (
	"encoding/json"
	"fmt"
	"io"
	intializer "mis/Intializer"
	middleware "mis/Middleware"
	"mis/model"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"time"
)

func CreateEvent(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Unauthorized Method!", http.StatusMethodNotAllowed)
		return
	}

	Useremail, ok := r.Context().Value(middleware.UserEmailKey).(string)
	if !ok {
		http.Error(w, "Need to login", http.StatusUnauthorized)
		return
	}

	err := r.ParseMultipartForm(32 << 20)
	if err != nil {
		http.Error(w, "File too large or invalid form data", http.StatusBadRequest)
		return
	}

	title := strings.TrimSpace(r.FormValue("title"))
	description := strings.TrimSpace(r.FormValue("description"))
	propertytype := strings.ToLower(strings.TrimSpace(r.FormValue("propertytype")))
	priceStr := strings.TrimSpace(r.FormValue("price"))
	listingtype := strings.ToLower(strings.TrimSpace(r.FormValue("listingtype")))
	propertystatus := strings.ToLower(strings.TrimSpace(r.FormValue("propertystatus")))
	status := strings.ToLower(strings.TrimSpace(r.FormValue("status")))
	address := strings.TrimSpace(r.FormValue("address"))
	city := strings.TrimSpace(r.FormValue("city"))

	validPropertyTypes := map[string]bool{"apartment": true, "house": true, "villa": true, "office": true}
	if !validPropertyTypes[propertytype] {
		http.Error(w, "Invalid propertytype. Allowed: apartment, house, villa, office", http.StatusBadRequest)
		return
	}

	validListingTypes := map[string]bool{"sale": true, "rent": true}
	if !validListingTypes[listingtype] {
		http.Error(w, "Invalid listingtype. Allowed: sale, rent", http.StatusBadRequest)
		return
	}

	price, err := strconv.Atoi(priceStr)
	if err != nil || price < 0 {
		http.Error(w, "Price must be a valid positive number", http.StatusBadRequest)
		return
	}

	if propertystatus == "" {
		propertystatus = "available"
	}
	if status == "" {
		status = "pending"
	}

	// --- HANDLE FILE UPLOADS --- //
	uploadDir := "./uploads"
	os.MkdirAll(uploadDir, os.ModePerm)

	var imageURLs []string
	files := r.MultipartForm.File["images"]

	if len(files) > 4 {
		http.Error(w, "You can upload a maximum of 4 photos", http.StatusBadRequest)
		return
	}

	for _, fileHeader := range files {
		file, err := fileHeader.Open()
		if err != nil {
			http.Error(w, "Failed to read file", http.StatusBadRequest)
			return
		}

		ext := filepath.Ext(fileHeader.Filename)
		filename := fmt.Sprintf("%d_%s%s", time.Now().UnixNano(), strings.TrimSuffix(fileHeader.Filename, ext), ext)
		dstPath := filepath.Join(uploadDir, filename)

		dst, err := os.Create(dstPath)
		if err != nil {
			file.Close()
			http.Error(w, "Failed to save image", http.StatusInternalServerError)
			return
		}

		if _, err := io.Copy(dst, file); err != nil {
			file.Close()
			dst.Close()
			http.Error(w, "Failed to save image", http.StatusInternalServerError)
			return
		}

		file.Close()
		dst.Close()

		imageURL := fmt.Sprintf("http://localhost:8080/uploads/%s", filename)
		imageURLs = append(imageURLs, imageURL)
	}

	imageJSON, err := json.Marshal(imageURLs)
	if err != nil {
		http.Error(w, "Failed to process image URLs", http.StatusInternalServerError)
		return
	}

	query := `INSERT INTO Property (title, description, propertytype, price, listingtype, propertystatus, status, address, city, image_url) 
	          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

	_, err = intializer.DB.Exec(
		query, title, description, propertytype, price, listingtype, propertystatus, status, address, city, string(imageJSON))

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	w.Write([]byte(fmt.Sprintf(`{"message":"Successfully created listing for %s"}`, Useremail)))
}
func UpdateEvent(w http.ResponseWriter, r *http.Request) {

	if r.Method != http.MethodPut {
		http.Error(w, "Invalid request!", http.StatusMethodNotAllowed)
		return
	}
	Useremail, ok := r.Context().Value(middleware.UserEmailKey).(string)
	if !ok {
		http.Error(w, "Need to login", http.StatusUnauthorized)
		return
	}
	var update model.Listing
	err := json.NewDecoder(r.Body).Decode(&update)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	result := `update  property set Title=?,Description=?,Property_type=?,Price=?,Listing_type=?,Property_Status=?,Status=?,address=?,city=? where id=?`
	res, err := intializer.DB.Exec(result, update.Title, update.Description, update.PropertyType, update.Price, update.ListingType, update.PropertyStatus, update.Status, update.Address, update.City, update.Id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	rowsaffected, err := res.RowsAffected()
	if rowsaffected == 0 {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	responseJSON := fmt.Sprintf(`{"message":"Event updated successfully by %s"}`, Useremail)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusAlreadyReported)
	w.Write([]byte(responseJSON))
}

func DeleteEvent(w http.ResponseWriter, r *http.Request) {

	if r.Method != http.MethodDelete {
		http.Error(w, "Invalid Request !", http.StatusUnauthorized)
		return
	}
	Useremail, ok := r.Context().Value(middleware.UserEmailKey).(string)
	if !ok {
		http.Error(w, "Need to login", http.StatusMethodNotAllowed)
		return
	}
	userRole, _ := r.Context().Value(middleware.UserRoleKey).(string)
	if userRole != "seller" && userRole != "admin" {
		http.Error(w, `{"message":"Forbidden: Only sellers and admins can delete events"}`, http.StatusForbidden)
		return
	}
	var delete model.Listing
	err := json.NewDecoder(r.Body).Decode(&delete)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	query := `delete from property where id=? `
	res, err := intializer.DB.Exec(query, delete.Id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	rowsaffected, err := res.RowsAffected()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if rowsaffected == 0 {
		http.Error(w, "event not found", http.StatusInternalServerError)
		return
	}
	responseJSON := fmt.Sprintf(`{"message":"Event deleted successfully by %s"}`, Useremail)

	w.Header().Set("Content-type", "application")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(responseJSON))
}
