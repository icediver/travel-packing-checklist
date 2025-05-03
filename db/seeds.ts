import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import AsyncStorage from "expo-sqlite/kv-store";
import { tasks } from "./schema/tasks.schema";
import { lists } from "./schema/lists.schema";
import { dates } from "./schema/dates.schema";

export const seeds = async (db: ExpoSQLiteDatabase) => {
  const value = AsyncStorage.getItemSync("dbInitialized");
  //if (value) return;
  //
  await db.delete(tasks);
  await db.delete(lists);
  await db.delete(dates);

  console.log("Inserting lists");
  await db
    .insert(lists)
    .values([
      { name: "Экипировка" },
      { name: "Документы" },
      { name: "Другое" },
    ]);

  console.log("Inserting tasks");

  await db.insert(tasks).values([
    { name: "Паспорт", description: "Паспорт", checked: 0, list_id: 2 },
    {
      name: "Паспорт марафонца",
      description: "Паспорт марафонца",
      checked: 0,
      list_id: 2,
    },
    {
      name: "Справка Допуск",
      description: "Справка Допуск",
      checked: 0,
      list_id: 2,
    },
    { name: "Страховка", description: "Страховка", checked: 0, list_id: 2 },
    { name: "Полис", description: "Полис", list_id: 2 },
    { name: "Банковская карта", description: "Банковская карта", list_id: 2 },
  ]);

  AsyncStorage.setItemSync("dbInitialized", "true");
};
