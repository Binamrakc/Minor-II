package controller

import (
	"encoding/json"
	intializer "mis/Intializer"
	middleware "mis/Middleware"
	"mis/model"
	"net/http"
)

func Getusers(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Unauthorized Access!", http.StatusMethodNotAllowed)
		return
	}
	userRole, _ := r.Context().Value(middleware.UserRoleKey).(string)
	if userRole != "admin" {
		http.Error(w, `{"message":"Forbidden: Admin access required"}`, http.StatusForbidden)
		return
	}

	query := `select id,name,email,status from register`
	rows, err := intializer.DB.Query(query)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	users := []model.Registerinput{}
	for rows.Next() {
		var u model.Registerinput
		err := rows.Scan(&u.Id, &u.Name, &u.Email, &u.Status)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		users = append(users, u)
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(users)
}
