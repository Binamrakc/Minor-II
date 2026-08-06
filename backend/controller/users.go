package controller

import (
	"database/sql"
	"encoding/json"
	"fmt"
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
	userRole, ok := r.Context().Value(middleware.UserRoleKey).(string)
	fmt.Println("userRole:", userRole, "ok:", ok)
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

func Updateuser(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPut {
		http.Error(w, "Unauthorized acess!", http.StatusMethodNotAllowed)
		return
	}

	userRole, _ := r.Context().Value(middleware.UserRoleKey).(string)
	if userRole != "admin" {
		http.Error(w, `{"message":"Forbidden: Admin access required"}`, http.StatusForbidden)
		return
	}

	var update model.Registerinput
	err := json.NewDecoder(r.Body).Decode(&update)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if update.Id == 0 {
		http.Error(w, `{"message":"User id is required"}`, http.StatusBadRequest)
		return
	}

	query := `update register set name=?, address=?, phone=?, age=?, status=? where id=?`
	res, err := intializer.DB.Exec(query, update.Name, update.Address, update.Phone, update.Age, update.Status, update.Id)
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
		http.Error(w, `{"message":"Account not found"}`, http.StatusNotFound)
		return
	}

	w.Header().Set("Content-type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"message":"User updated successfully"}`))
}

func Deleteuser(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodDelete {
		http.Error(w, "Invalid Method!", http.StatusMethodNotAllowed)
		return
	}

	Useremail, ok := r.Context().Value(middleware.UserEmailKey).(string)
	if !ok {
		http.Error(w, "Need to login", http.StatusUnauthorized)
		return
	}

	userRole, _ := r.Context().Value(middleware.UserRoleKey).(string)
	if userRole != "admin" {
		http.Error(w, `{"message":"Forbidden: Admin access required"}`, http.StatusForbidden)
		return
	}

	var del model.Registerinput
	err := json.NewDecoder(r.Body).Decode(&del)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	query := `delete from register where id=?`
	res, err := intializer.DB.Exec(query, del.Id)
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
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	responseJSON := fmt.Sprintf(`{"message":"User deleted successfully by %s"}`, Useremail)

	w.Header().Set("Content-type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(responseJSON))
}

func Deleteownid(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodDelete {
		http.Error(w, "Invalid method!!", http.StatusUnauthorized)
		return
	}
	userEmail, ok := r.Context().Value(middleware.UserEmailKey).(string)
	if !ok || userEmail == "" {
		http.Error(w, `{"message":"Unauthorized: Please log in"}`, http.StatusUnauthorized)
		return
	}
	query := `delete from register where email=?`
	res, err := intializer.DB.Exec(query, userEmail)
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
		http.Error(w, `{"message":"Account not found"}`, http.StatusNotFound)
		return
	}
	w.Header().Set("Content-type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"message":"Your account has been deleted successfully"}`))
}

func Getprofile(w http.ResponseWriter, r *http.Request) {
	// Ensure correct HTTP Method
	if r.Method != http.MethodGet {
		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
		return
	}

	// 1. Retrieve logged-in user's email set by Jwtmiddleware
	userEmail, ok := r.Context().Value(middleware.UserEmailKey).(string)
	if !ok || userEmail == "" {
		http.Error(w, `{"message":"Unauthorized: Need to login"}`, http.StatusUnauthorized)
		return
	}

	// 2. Query user details from the 'register' table using the email
	var user model.Registerinput
	query := `SELECT Id, name, email, address, phone, age, Status FROM register WHERE email = ?`

	err := intializer.DB.QueryRow(query, userEmail).Scan(
		&user.Id,
		&user.Name,
		&user.Email,
		&user.Address,
		&user.Phone,
		&user.Age,
		&user.Status,
	)

	if err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, `{"message":"User profile not found"}`, http.StatusNotFound)
			return
		}
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// 3. Send full user profile response as JSON
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(user)
}
