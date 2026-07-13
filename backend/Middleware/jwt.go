package middleware

import (
	"fmt"
	"net/http"
	"os"
	"strings"

	"github.com/golang-jwt/jwt/v5"
)

func Jwtmiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("content-type", "application/json")

		authheader := r.Header.Get("authorization")
		if authheader == "" {
			http.Error(w, `{"message":"missing authorization"}`, http.StatusUnauthorized)
			return
		}
		parts := strings.Split(authheader, " ")
		if len(parts) != 2 || parts[0] != "Bearer" {
			http.Error(w, `{"message":"invalid authorization"}`, http.StatusUnauthorized)
			return
		}
		tokenstring := parts[1]
		secret := os.Getenv("JWT_TOKEN")
		if secret == "" {
			secret = "dafault_secret"
		}
		token, err := jwt.Parse(tokenstring, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("unexpected signing method")

			}
			return []byte(secret), nil
		})
		if err != nil || !token.Valid {
			http.Error(w, `{"message":"invalid token"}`, http.StatusUnauthorized)
			return
		}
		next(w, r)
	}
}
