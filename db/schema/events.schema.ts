import { int, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { lists } from "./lists.schema";
import { dates } from "./dates.schema";

export const events = sqliteTable(
  "events",
  {
    listId: int("list_id")
      .notNull()
      .references(() => lists.id),
    dateId: int("date_id")
      .notNull()
      .references(() => dates.id),
  },
  (t) => [primaryKey({ columns: [t.listId, t.dateId] })],
);

export const eventsRelations = relations(events, ({ one, many }) => ({
  list: one(lists, {
    fields: [events.listId],
    references: [lists.id],
  }),
  date: one(dates, {
    fields: [events.dateId],
    references: [dates.id],
  }),
  tasks: many(events),
}));

export type EventType = typeof events.$inferSelect;
