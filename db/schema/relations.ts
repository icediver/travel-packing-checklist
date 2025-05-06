import { relations } from "drizzle-orm";
import { lists } from "./lists.schema";
import { tasks } from "./tasks.schema";
import { completedTasks } from "./completed-tasks.schema";
import { events } from "./events.schema";
import { dates } from "./dates.schema";

export const tasksRelations = relations(tasks, ({ one, many }) => ({
  list: one(lists, {
    fields: [tasks.listId],
    references: [lists.id],
  }),
  completedTasks: many(completedTasks),
}));

export const listsRelations = relations(lists, ({ many }) => ({
  tasks: many(tasks),
  //dates: many(dates),
  events: many(events),
  completedTasks: many(completedTasks),
}));

export const datesRelations = relations(dates, ({ many }) => ({
  events: many(events),
  completedTasks: many(completedTasks),
}));

export const eventsRelations = relations(events, ({ one, many }) => ({
  list: one(lists, {
    fields: [events.listId],
    references: [lists.id],
  }),
  date: one(dates, {
    fields: [events.dateId],
    references: [dates.id],
  }),
  completedTasks: many(completedTasks),
}));

export const completedTasksRelations = relations(completedTasks, ({ one }) => ({
  event: one(events, {
    fields: [completedTasks.eventId],
    references: [events.id],
  }),
  task: one(tasks, {
    fields: [completedTasks.taskId],
    references: [tasks.id],
  }),
}));
