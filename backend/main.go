package main

import (
	intializer "mis/Intializer"

	"mis/controller"
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/rs/cors"
)

func init() {
	intializer.Loadenv()
	intializer.DBconnect()
	intializer.User()
}

func main() {
	r := http.NewServeMux()

	c := cors.New(cors.Options{
		AllowedOrigin:      []string{"https://localhost:3000"},
		AllowedMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:     []string{"Content-Type", "Authorization"},
		AllowedCredentials: true,
	})
	corshandler := c.Handler(r)
	s := http.Server{
		Addr:         ":8080",
		Handler:      corshandler,
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 5 * time.Second,
	}

	r.HandleFunc("POST /register", controller.CreateUser)
	r.HandleFunc("/login", controller.Login)
	s.ListenAndServe()
}
