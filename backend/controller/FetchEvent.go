package controller

import (
	"encoding/json"
	intializer "mis/Intializer"
	middleware "mis/Middleware"
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
		err := rows.Scan(&fetch.Id, &fetch.Title, &fetch.Description, &fetch.PropertyType, &fetch.Price, &fetch.ListingType, &fetch.PropertyStatus, &fetch.Status, &fetch.Address, &fetch.City)
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
	userRole, _ := r.Context().Value(middleware.UserRoleKey).(string)
	if userRole != "admin" {
		http.Error(w, `{"message":"Forbidden: Admin access required"}`, http.StatusForbidden)
		return
	}
	query := `select id,Title,Description,Property_type,Price,Listing_type,Property_Status,Status,address,city
				from property where Status='pending'`
	rows, err := intializer.DB.Query(query)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	pending := []model.Listing{}
	for rows.Next() {
		var fetch model.Listing
		err := rows.Scan(&fetch.Id, &fetch.Title, &fetch.Description, &fetch.PropertyType, &fetch.Price, &fetch.ListingType, &fetch.PropertyStatus, &fetch.Status, &fetch.Address, &fetch.City)
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

type ReviewRequest struct { // Capital 'R' and 'R'
	ID     int    `json:"id"`
	Action string `json:"action"`
}

func ReviewEvent(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPut {
		http.Error(w, `{"message":"Method not allowed"}`, http.StatusMethodNotAllowed)
		return
	}

	// Restrict to Admin role
	userRole, _ := r.Context().Value(middleware.UserRoleKey).(string)
	if userRole != "admin" {
		http.Error(w, `{"message":"Forbidden: Admin access required"}`, http.StatusForbidden)
		return
	}

	var req ReviewRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, `{"message":"Invalid payload"}`, http.StatusBadRequest)
		return
	}

	switch req.Action {
	case "accept":

		query := "UPDATE property SET Status = 'approved' WHERE id = ?"
		res, err := intializer.DB.Exec(query, req.ID)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		rowsAffected, _ := res.RowsAffected()
		if rowsAffected == 0 {
			http.Error(w, `{"message":"Event not found"}`, http.StatusNotFound)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`{"message":"Event accepted and published to dashboard"}`))

	case "reject":

		query := "DELETE FROM property WHERE id = ?"
		res, err := intializer.DB.Exec(query, req.ID)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		rowsAffected, _ := res.RowsAffected()
		if rowsAffected == 0 {
			http.Error(w, `{"message":"Event not found"}`, http.StatusNotFound)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`{"message":"Event rejected and permanently deleted"}`))

	default:
		http.Error(w, `{"message":"Action must be either 'accept' or 'reject'"}`, http.StatusBadRequest)
	}
}
