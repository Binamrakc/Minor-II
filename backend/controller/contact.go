package controller

import (
	"encoding/json"
	"fmt"
	intializer "mis/Intializer"
	middleware "mis/Middleware"
	"mis/model"
	"net/http"
)

func Contact(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Unauthorized Method", http.StatusUnauthorized)
		return
	}
	Useremail, ok := r.Context().Value(middleware.UserEmailKey).(string)
	if !ok {
		http.Error(w, "Need to login", http.StatusUnauthorized)
		return
	}
	var contact model.Contact
	err := json.NewDecoder(r.Body).Decode(&contact)
	if err != nil {
		http.Error(w, "invalid data fields", http.StatusBadRequest)
		return
	}
	query := "insert into contact(email,phone ,description)values(?,?,?,?)"

	_, err = intializer.DB.Exec(query, contact.Id, contact.Email, contact.Phone, contact.Description)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	responseJSON := fmt.Sprintf(`{"message":"Event updated successfully by %s"}`, Useremail)
	w.WriteHeader(http.StatusCreated)
	w.Write([]byte(responseJSON))
}

func Getequiry(w http.ResponseWriter, r *http.Request) {

	if r.Method != http.MethodGet {
		http.Error(w, "Unauthorized Method !", http.StatusUnauthorized)
		return
	}

	query := "SELECT id, email, phone, description, created_at FROM contact"
	rows, err := intializer.DB.Query(query)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	inquiry := []model.Contact{}
	for rows.Next() {
		var c model.Contact
		err := rows.Scan(&c.Id, &c.Email, &c.Phone, &c.Description, &c.Created_at)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		inquiry = append(inquiry, c)
	}
	if err = rows.Err(); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)

	err = json.NewEncoder(w).Encode(inquiry)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}
