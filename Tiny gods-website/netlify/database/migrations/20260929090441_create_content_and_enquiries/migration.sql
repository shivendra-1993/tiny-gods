CREATE TABLE "enquiries" (
	"id" text PRIMARY KEY,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"company" text DEFAULT '' NOT NULL,
	"phone" text DEFAULT '' NOT NULL,
	"project_type" text NOT NULL,
	"budget" text DEFAULT '' NOT NULL,
	"timeline" text DEFAULT '' NOT NULL,
	"message" text NOT NULL,
	"source" text DEFAULT '' NOT NULL,
	"submitted_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "site_content" (
	"id" integer PRIMARY KEY,
	"data" jsonb NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
