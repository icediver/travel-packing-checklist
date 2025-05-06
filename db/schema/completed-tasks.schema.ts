import { int, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { events } from "./events.schema";
import { tasks } from "./tasks.schema";

export const completedTasks = sqliteTable("completed_tasks", {
  id: int("id").primaryKey({ autoIncrement: true }),
  taskId: int("task_id")
    .notNull()
    .references(() => tasks.id),
  eventId: int("event_id")
    .notNull()
    .references(() => events.id),
  completedAt: text("completed_at")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});

export type CompletedTasksType = typeof completedTasks.$inferSelect;
