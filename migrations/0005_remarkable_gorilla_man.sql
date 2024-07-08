CREATE TABLE IF NOT EXISTS "testimonial_table" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"testimonial" text NOT NULL,
	"images" text[],
	"space_id" text NOT NULL,
	"user_id" text NOT NULL,
	"data" date
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "testimonial_table" ADD CONSTRAINT "testimonial_table_space_id_space_table_id_fk" FOREIGN KEY ("space_id") REFERENCES "public"."space_table"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "testimonial_table" ADD CONSTRAINT "testimonial_table_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
