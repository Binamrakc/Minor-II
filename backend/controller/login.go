package controller

import (
	"encoding/json"
	intializer "mis/Intializer"
	"mis/model"
	"net/http"

	"golang.org/x/crypto/bcrypt"
)

func Login(w http.ResponseWriter, r *http.Request) {

	if r.Method != http.MethodGet {
		http.Error(w, "invalid method", http.StatusUnauthorized)
		return
	}
	var login model.Registerinput

	err := json.NewDecoder(r.Body).Decode(&login)
	if err != nil {
		http.Error(w, "data not found", http.StatusInternalServerError)
		return
	}

	var storeshash string
	var id int
	result := "Select id, password from register Where email=?"

	err = intializer.DB.QueryRow(result, login.Email).Scan(&id, &storeshash)
	if err != nil {
		http.Error(w, `{"message":"invalid email or password"}`, http.StatusUnauthorized)
		return
	}
	err = bcrypt.CompareHashAndPassword([]byte(storeshash), []byte(login.Password))
	if err != nil {
		http.Error(w, `{"message":"invalid email or password"}`, http.StatusUnauthorized)
		return
	}
	response := map[string]string{
		"message": "Login Successfully",
		"Token":   "JWT Generated",
	}
	json.NewEncoder()
}
