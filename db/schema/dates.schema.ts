import { relations } from "drizzle-orm";
import { events } from "./events.schema";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const dates = sqliteTable("dates", {
  id: int("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  date: text("date").notNull().unique(),
});

export type DateType = typeof dates.$inferSelect;
