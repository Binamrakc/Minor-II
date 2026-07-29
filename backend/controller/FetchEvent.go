package controller

import (
	intializer "mis/Intializer"
	"net/http"
)

func GetDashboard(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Invalid Request", http.StatusUnauthorized)
		return
	}
	query := `select id,Title,Description,Property_type,Price,Listing_type,Property_Status,Status,address,city
				from property where Status='approved'`
	rows, err := intializer.DB.Query(query)
	if err != nil {
		http.Error(w, err.Error())
	}
}
