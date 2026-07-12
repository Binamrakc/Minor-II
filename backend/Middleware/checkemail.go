package middleware

import (
	intializer "mis/Intializer"
	"net/http"
)

func Emailexists(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		email := r.PathValue("email")

		var exists bool
		checkquery := "seelcts exists(select 1 FROM register WHERE email=$1)"
		err := intializer.DB.QueryRow(checkquery, email).Scan(&exists)
		if err != nil {
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
