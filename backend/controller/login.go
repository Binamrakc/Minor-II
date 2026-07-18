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

	if r.Method != http.MethodPost {
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
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}
	err = bcrypt.CompareHashAndPassword([]byte(storeshash), []byte(login.Password))
	if err != nil {
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}
	tokenstring, err := JWT(login.Email)
	if err != nil {
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"message": "Login Successfully",
		"Token":   tokenstring,
	})
}

func JWT(email string) (string, error) {

	claims := jwt.MapClaims{
		"email": email,
		"exp":   time.Now().Add(time.Hour * 24).Unix(),
	}
	secret := os.Getenv("JWT_TOKEN")
	if secret == "" {
		secret = "dafault_secret"
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(secret))
}
