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

export const completedTasksRelations = relations(completedTasks, ({ one }) => ({
  task: one(tasks, {
    fields: [completedTasks.taskId],
    references: [tasks.id],
  }),
  list: one(lists, {
    fields: [completedTasks.listId],
    references: [lists.id],
  }),
  date: one(dates, {
    fields: [completedTasks.dateId],
    references: [dates.id],
  }),
}));

export type CompletedTasksType = typeof completedTasks.$inferSelect;
