package main

import (
	intializer "mis/Intializer"
	middleware "mis/Middleware"

	"mis/controller"
	"net/http"
	"time"

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
		AllowedOrigins:   []string{"https://localhost:3000"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	})
	corshandler := c.Handler(r)
	s := http.Server{
		Addr:         ":8080",
		Handler:      corshandler,
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 5 * time.Second,
	}

	r.HandleFunc("POST /register", controller.CreateUser)
	r.HandleFunc("POST /login", controller.Login)
	r.HandleFunc("POST /createevent", middleware.Jwtmiddleware(controller.CreateEvent))
	r.HandleFunc("POST /contact", controller.Contact)
	s.ListenAndServe()
}
