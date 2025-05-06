import { relations } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { tasks } from "./tasks.schema";
import { dates } from "./dates.schema";
import { events } from "./events.schema";

export const lists = sqliteTable("lists", {
  id: int("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
});

export type ListType = typeof lists.$inferSelect;
