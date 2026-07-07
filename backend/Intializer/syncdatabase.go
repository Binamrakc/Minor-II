package model

import "log"

func User() {
	Users := `

Create TABLE if not exists Users{
 ID int AUTO_INCREMENT PRI,
 Name varchar(55) not null,
 Email varchar(55) unique,
 Password varchar(55) not null,
)
 `

	_, err := DB.Exec(Users)
	if err != nil {
		log.Fatal("failed to exec the user table")

		Register := `
		create table if not exists register(
		Id serial primary key
		name varchar(55) not null,
		address varchar(55) not null,
		phone integer not null,
		age integer not null,
		created_at Date not null
		 )`
		_, err := DB.Exec(Register)
		if err != nil {
			log.Fatal("failed to exec the register table")
		}
	}
}
