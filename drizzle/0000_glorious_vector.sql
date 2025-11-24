CREATE TABLE "users" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"role" varchar(50) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"profilePictureUrl" varchar(512),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
