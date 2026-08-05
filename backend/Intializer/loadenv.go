package intializer

import (
	"log"

	"github.com/joho/godotenv"
)

func Loadenv() {
	err := godotenv.Load()
	if err != nil {
		log.Println("No .env file found, using defaults")
	}
}
