package intializer

import (
	"log"
	"os"
)

func Dbmigrate() {

	content, err := os.ReadFile("../syncdatabase.go")
	if err != nil {
		log.Println("Could not read file", err)
		return
	}

	_, err = DB.Exec(string(content))
	if err != nil {
		log.Println("auto migration failed", err)
	}
}
