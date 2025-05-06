import {
  int,
  primaryKey,
  sqliteTable,
  text,
  unique,
} from "drizzle-orm/sqlite-core";
import { lists } from "./lists.schema";
import { dates } from "./dates.schema";

export const events = sqliteTable(
  "events",
  {
    id: int("id").primaryKey({ autoIncrement: true }),
    listId: int("list_id")
      .notNull()
      .references(() => lists.id),
    dateId: int("date_id")
      .notNull()
      .references(() => dates.id),
  },
  (t) => ({
    // Добавляем уникальный индекс на составные поля
    unq: unique().on(t.listId, t.dateId),
  }),
);
export type EventType = typeof events.$inferSelect;
