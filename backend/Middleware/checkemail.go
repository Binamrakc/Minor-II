package middleware

import (
	"log"
	intializer "mis/Intializer"
	"net/http"
)

func Emailexists(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		email := r.PathValue("email")

		var exists bool
		checkquery := "SELECT COUNT(*) FROM register WHERE email=?"
		err := intializer.DB.QueryRow(checkquery, email).Scan(&exists)
		if err != nil {
			log.Println("SQL Execution Error:", err)
			http.Error(w, "database error", http.StatusInternalServerError)
			return
		}
		if exists {
			http.Error(w, "email already exists", http.StatusBadRequest)
			return
		}
		next(w, r)
	}
}
