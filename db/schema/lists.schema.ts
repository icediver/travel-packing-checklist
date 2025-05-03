import { relations } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { tasks } from "./tasks.schema";
import { dates } from "./dates.schema";
import { events } from "./events.schema";

export const lists = sqliteTable("lists", {
  id: int("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
});

export const listsRelations = relations(lists, ({ many }) => ({
  tasks: many(tasks),
  dates: many(dates),
  listDates: many(events),
}));
export type ListType = typeof lists.$inferSelect;
