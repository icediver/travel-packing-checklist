import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { lists } from "./lists.schema";
import { relations } from "drizzle-orm";
import { completedTasks } from "./completed-tasks.schema";

export const tasks = sqliteTable("tasks", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  description: text(),
  listId: int("list_id")
    .notNull()
    .references(() => lists.id),
});

//export default tasks;

export type TaskType = typeof tasks.$inferSelect;
