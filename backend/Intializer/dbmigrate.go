package model

import (
	"log"
	"os"
)

func Dbmigrate() {

	content, err := os.ReadFile("database.sql")
	if err != nil {
		log.Println("Could not read file", err)
	}

	_, err = DB.Exec(string(content))
	if err != nil {
		log.Println("auto migration failed", err)
	}
}
