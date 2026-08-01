package controller

import (
	"encoding/json"
	"fmt"
	intializer "mis/Intializer"
	middleware "mis/Middleware"
	"mis/model"
	"net/http"
)

func CreateEvent(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "unauthorized Method!!", http.StatusMethodNotAllowed)
		return
	}
	Useremail, ok := r.Context().Value(middleware.UserEmailKey).(string)
	if !ok {
		http.Error(w, "Need to login", http.StatusUnauthorized)
		return
	}
	var event model.Listing

	err := json.NewDecoder(r.Body).Decode(&event)
	if err != nil {
		http.Error(w, "invalid data fields", http.StatusBadRequest)
		return
	}
	query := `insert into property (id,Title,Description,Property_type,Price,Listing_type,Property_Status,Status,address,city)values(?,?,?,?,?,?,?,?,?,?)`

	_, err = intializer.DB.Exec(query, event.Id, event.Title, event.Description, event.PropertyType, event.Price, event.ListingType, event.PropertyStatus, event.Status, event.Address, event.City)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	w.Write([]byte(`{"message":"successfully created"` + Useremail + `"}`))
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
