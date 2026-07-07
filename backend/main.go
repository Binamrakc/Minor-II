package main

import (
	"Backend/intializer"
	"mis/controller"
	"net/http"
	"time"
)

func main() {
	r := http.NewServeMux()
	intializer.Loadenv()
	intializer.DBconnect()
	intializer.Dbmigrate()
	s := http.Server{
		Addr:         ":8080",
		Handler:      r,
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 5 * time.Second,
	}
	r.HandleFunc("GET/register", controller.Create)
	r.HandleFunc("/login", controller.Login)
	r.HandleFunc("/update", controller.Update)
	r.HandleFunc("/delete", controller.Delete)
	s.ListenAndServe()
}
