package controller

import "net/http"

func Contact(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Unauthorized Method", http.StatusUnauthorized)
		return
	}

}
