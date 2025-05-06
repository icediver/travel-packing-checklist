import { int, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { events } from "./events.schema";
import { tasks } from "./tasks.schema";
import { dates } from "./dates.schema";
import { lists } from "./lists.schema";

export const completedTasks = sqliteTable(
  "completed_tasks",
  {
    taskId: int("task_id")
      .notNull()
      .references(() => tasks.id),

    listId: int("lsit_id")
      .notNull()
      .references(() => events.listId),
    dateId: int("date_id")
      .notNull()
      .references(() => events.dateId),
  },
  (t) => [primaryKey({ columns: [t.taskId, t.listId, t.dateId] })],
);

export type CompletedTasksType = typeof completedTasks.$inferSelect;
