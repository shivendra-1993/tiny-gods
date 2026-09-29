import { pgTable, integer, jsonb, text, timestamp } from "drizzle-orm/pg-core";

// The whole editable site content (hero, about, services, work, team, ...)
// is stored as a single JSON document, matching how the admin panel saves it.
export const siteContent = pgTable("site_content", {
  id: integer().primaryKey(),
  data: jsonb().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const enquiries = pgTable("enquiries", {
  id: text().primaryKey(),
  name: text().notNull(),
  email: text().notNull(),
  company: text().notNull().default(""),
  phone: text().notNull().default(""),
  projectType: text("project_type").notNull(),
  budget: text().notNull().default(""),
  timeline: text().notNull().default(""),
  message: text().notNull(),
  source: text().notNull().default(""),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
});
