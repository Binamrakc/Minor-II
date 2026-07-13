package intializer

import "log"

func User() {

	_, _ = DB.Exec("DROP TABLE IF EXISTS register;")
	_, _ = DB.Exec("DROP TABLE IF EXISTS users;")

	Users := `

Create TABLE if not exists Users(
 ID  serial primary key,
 Name varchar(55) not null,
 Email varchar(55) unique,
 Password varchar(255) not null
);
 `

	_, err := DB.Exec(Users)
	if err != nil {
		log.Fatal("failed to exec the user table")
	} else {
		log.Println("User table created")
	}
	log.Println("🌟 FINGERPRINT: TESTING IF THIS CODE IS ALIVE 🌟")
	Register := `
		create table if not exists register(
		Id serial primary key,
		name varchar(55) not null,
		email varchar(55) unique,
		address varchar(55) not null,
		phone integer not null,
		age integer not null,
		created_at Date not null
		 );`
	_, err = DB.Exec(Register)
	if err != nil {
		log.Fatal("failed to exec the register table")
	} else {
		log.Println("register table created")
	}
	log.Printf("table execute sucessfully")
}
