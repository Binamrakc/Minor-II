package controller

import (
	"encoding/json"
	"log"
	intializer "mis/Intializer"
	"mis/model"
	"net/http"

	"golang.org/x/crypto/bcrypt"
)

func CreateUser(w http.ResponseWriter, r *http.Request) {

	if r.Method != http.MethodPost {
		http.Error(w, "Mehtod not allowed", http.StatusMethodNotAllowed)
		return
	}

	var input model.Registerinput

	err := json.NewDecoder(r.Body).Decode(&input)
	if err != nil {
		http.Error(w, "invalid input data fields", http.StatusBadRequest)
		return
	}
	var count int
	checkQuery := "SELECT COUNT(*) FROM register WHERE email = ?"
	err = intializer.DB.QueryRow(checkQuery, input.Email).Scan(&count)
	if err != nil {
		log.Println("SQL Check Error:", err)
		http.Error(w, "database error", http.StatusInternalServerError)
		return
	}

	if count > 0 {
		http.Error(w, "email already exists", http.StatusBadRequest)
		return
	}

	hashedpassword, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
	if err != nil {
		http.Error(w, "failed to secure password", http.StatusInternalServerError)
		return
	}
	result := "insert into register(name,address,email,password,phone,age) values (?,?,?,?,?,?)"

	_, err = intializer.DB.Exec(result, input.Name, input.Address, input.Email, string(hashedpassword), input.Phone, input.Age)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusCreated)
	w.Write([]byte("user registered successfully"))
}
