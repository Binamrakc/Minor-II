package controller

import (
	"encoding/json"
	intializer "mis/Intializer"
	"mis/model"
	"net/http"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

func Login(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	if r.Method != http.MethodPost {
		http.Error(w, `{"message":"Method not allowed"}`, http.StatusMethodNotAllowed)
		return
	}

	var login model.Registerinput
	err := json.NewDecoder(r.Body).Decode(&login)
	if err != nil {
		http.Error(w, `{"message":"Invalid request body"}`, http.StatusBadRequest)
		return
	}

	var storeshash string
	var id int
	var role string

	result := "SELECT id, password,status FROM register WHERE email = ?"
	err = intializer.DB.QueryRow(result, login.Email).Scan(&id, &storeshash, &role)
	if err != nil {
		http.Error(w, `{"message":"Invalid email or password"}`, http.StatusUnauthorized)
		return
	}
	err = bcrypt.CompareHashAndPassword([]byte(storeshash), []byte(login.Password))
	if err != nil {
		http.Error(w, `{"message":"Invalid email or password"}`, http.StatusUnauthorized)
		return
	}
	tokenstring, err := JWT(login.Email, role)
	if err != nil {
		http.Error(w, `{"message":"Failed to generate token"}`, http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{
		"message": "Login Successful",
		"token":   tokenstring,
	})
}

func JWT(email string, role string) (string, error) {
	claims := jwt.MapClaims{
		"email": email,
		"role":  role,
		"exp":   time.Now().Add(time.Hour * 24).Unix(),
	}

	secret := os.Getenv("JWT_TOKEN")
	if secret == "" {
		secret = "default_secret"
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(secret))
}
