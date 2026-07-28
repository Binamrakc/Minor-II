package controller

import (
	"encoding/json"
	intializer "mis/Intializer"
	middleware "mis/Middleware"
	"mis/model"
	"net/http"
)

func CreateEvent(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "unauthorized Methid!!", http.StatusUnauthorized)
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
	query := "insert into property (id,Title,Description,Property_type,Price,Listing_type,Property_Status,Status,address,city)values(?,?,?,?,?,?,?,?,?,?)"

	_, err = intializer.DB.Exec(query, event.Id, event.Title, event.Description, event.PropertyType, event.Price, event.ListingType, event.PropertyStatus, event.Status, event.Address, event.City)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	w.Write([]byte(`{"message":"successfully created"` + Useremail + `"}`))
}
