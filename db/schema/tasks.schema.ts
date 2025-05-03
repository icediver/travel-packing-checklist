import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { lists } from "./lists.schema";
import { relations } from "drizzle-orm";

export const tasks = sqliteTable("tasks", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  description: text(),
  listId: int("list_id")
    .notNull()
    .references(() => lists.id),
});

export const tasksRelations = relations(tasks, ({ one, many }) => ({
  list: one(lists, {
    fields: [tasks.listId],
    references: [lists.id],
  }),
  tasks: many(tasks),
}));

//export default tasks;

export type TaskType = typeof tasks.$inferSelect;
