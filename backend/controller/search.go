package controller

import (
	"encoding/json"
	intializer "mis/Intializer"
	"mis/model"
	"net/http"
	"strconv"
	"strings"
)

func SearchProperty(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	q := r.URL.Query()
	location := strings.TrimSpace(q.Get("query"))
	propType := strings.TrimSpace(q.Get("type"))
	maxPriceStr := strings.TrimSpace(q.Get("price"))

	conditions := []string{"status = 'approved'"}
	args := []interface{}{}

	if location != "" {
		conditions = append(conditions, "(address LIKE ? OR city LIKE ?)")
		like := "%" + location + "%"
		args = append(args, like, like)
	}

	if propType != "" {
		conditions = append(conditions, "propertytype = ?")
		args = append(args, strings.ToLower(propType))
	}

	if maxPriceStr != "" {
		maxPrice, err := strconv.Atoi(maxPriceStr)
		if err != nil {
			http.Error(w, "invalid price value", http.StatusBadRequest)
			return
		}
		conditions = append(conditions, "price <= ?")
		args = append(args, maxPrice)
	}

	query := "SELECT id, title, description, propertytype, price, listingtype, propertystatus, status, address, city, image_url, created_at FROM Property WHERE " +
		strings.Join(conditions, " AND ") +
		" ORDER BY created_at DESC"

	rows, err := intializer.DB.Query(query, args...)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	properties := []model.Listing{}
	for rows.Next() {
		var p model.Listing
		if err := rows.Scan(
			&p.Id, &p.Title, &p.Description, &p.PropertyType, &p.Price,
			&p.ListingType, &p.PropertyStatus, &p.Status, &p.Address, &p.City,
			&p.Imageurl, &p.Created_at,
		); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		properties = append(properties, p)
	}
	if err := rows.Err(); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(properties)
}
