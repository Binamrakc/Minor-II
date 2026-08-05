package middleware

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"strings"

	"github.com/golang-jwt/jwt/v5"
)

type contextKey string

const UserRoleKey contextKey = "userRole"
const UserEmailKey contextKey = "userEmail"

func Jwtmiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")

		authheader := r.Header.Get("Authorization") // Standard capitalization
		if authheader == "" {
			http.Error(w, `{"message":"Missing authorization header"}`, http.StatusUnauthorized)
			return
		}

		parts := strings.Split(authheader, " ")
		if len(parts) != 2 || parts[0] != "Bearer" {
			http.Error(w, `{"message":"Invalid authorization format"}`, http.StatusUnauthorized)
			return
		}

		tokenstring := parts[1]
		secret := os.Getenv("JWT_TOKEN")
		if secret == "" {
			secret = "default_secret"
		}

		token, err := jwt.Parse(tokenstring, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
			}
			return []byte(secret), nil
		})

		if err != nil || !token.Valid {
			http.Error(w, `{"message":"Invalid or expired token"}`, http.StatusUnauthorized)
			return
		}

		if claims, ok := token.Claims.(jwt.MapClaims); ok {
			ctx := r.Context()

			if email, ok := claims["email"].(string); ok {
				ctx = context.WithValue(ctx, UserEmailKey, email)
			}
			if role, ok := claims["role"].(string); ok {
				ctx = context.WithValue(ctx, UserRoleKey, role)
			}
			r = r.WithContext(ctx)
		}

		next(w, r)
	}
}
