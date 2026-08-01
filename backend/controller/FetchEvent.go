package controller

import (
	"encoding/json"
	intializer "mis/Intializer"
	"mis/model"
	"net/http"
)

func GetDashboard(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Invalid Request", http.StatusMethodNotAllowed)
		return
	}
	query := `select id,Title,Description,Property_type,Price,Listing_type,Property_Status,Status,address,city
				from property where Status='approved'`
	rows, err := intializer.DB.Query(query)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	pending := []model.Listing{}
	for rows.Next() {
		var fetch model.Listing
		err := rows.Scan(&fetch.Id, &fetch.Title, &fetch.Description, &fetch.PropertyType, &fetch.Price, &fetch.Price, &fetch.ListingType, &fetch.PropertyStatus, &fetch.Status, &fetch.Address, &fetch.City)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		pending = append(pending, fetch)
	}
	err = rows.Err()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(pending)
}

func Adminapprove(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Invalid Request", http.StatusMethodNotAllowed)
		return
	}

	query := `select id,Title,Description,Property_type,Price,Listing_type,Property_Status,Status,address,city
				from property where Status='approved'`
	rows, err := intializer.DB.Query(query)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	pending := []model.Listing{}
	for rows.Next() {
		var fetch model.Listing
		err := rows.Scan(&fetch.Id, &fetch.Title, &fetch.Description, &fetch.PropertyType, &fetch.Price, &fetch.Price, &fetch.ListingType, &fetch.PropertyStatus, &fetch.Status, &fetch.Address, &fetch.City)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		pending = append(pending, fetch)
	}
	err = rows.Err()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(pending)
}
