CREATE TABLE "product" (
	"product_id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar,
	"price" integer NOT NULL,
	"store_id" varchar
);
--> statement-breakpoint
CREATE TABLE "role" (
	"role_id" varchar PRIMARY KEY NOT NULL,
	"name" varchar
);
--> statement-breakpoint
CREATE TABLE "store" (
	"store_id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"cnpj" varchar NOT NULL,
	CONSTRAINT "store_cnpj_unique" UNIQUE("cnpj")
);
--> statement-breakpoint
CREATE TABLE "user_store" (
	"user_id" varchar,
	"store_id" varchar,
	CONSTRAINT "user_store_id" PRIMARY KEY("user_id","store_id")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"user_id" varchar PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"age" integer NOT NULL,
	"email" varchar(255) NOT NULL,
	"role_id" varchar,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "product" ADD CONSTRAINT "product_store_id_store_store_id_fk" FOREIGN KEY ("store_id") REFERENCES "public"."store"("store_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_store" ADD CONSTRAINT "user_store_user_id_user_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_store" ADD CONSTRAINT "user_store_store_id_store_store_id_fk" FOREIGN KEY ("store_id") REFERENCES "public"."store"("store_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_role_id_role_role_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."role"("role_id") ON DELETE set null ON UPDATE no action;