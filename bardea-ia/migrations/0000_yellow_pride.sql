CREATE TABLE "history" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"response_text" text NOT NULL,
	"original_message" text,
	"copied_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "responses" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"original_message" text NOT NULL,
	"context" text,
	"tone" text NOT NULL,
	"generated_text" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
