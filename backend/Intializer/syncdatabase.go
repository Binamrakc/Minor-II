package intializer

import "log"

func User() {

	_, _ = DB.Exec("DROP TABLE IF EXISTS register;")

	Register := `
		create table if not exists register(
		Id serial primary key,
		name varchar(55) not null,
		email varchar(55) unique,
		Password varchar(255) not null,
		address varchar(55) not null,
		phone integer not null,
		age integer not null,
		created_at Date not null
		 );`
	_, err := DB.Exec(Register)
	if err != nil {
		log.Fatal("failed to exec the register table")
	} else {
		log.Println("register table created")
	}
	log.Printf("table execute sucessfully")
}
