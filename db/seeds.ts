import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import AsyncStorage from "expo-sqlite/kv-store";
import { tasks } from "./schema/tasks.schema";
import { lists } from "./schema/lists.schema";
import { dates } from "./schema/dates.schema";
import * as schema from "./schema";

export default async function seeds(db: ExpoSQLiteDatabase<typeof schema>) {
  await db.transaction(async (tx) => {
    // Вставляем тестовые данные
    console.log("Inserting lists");
    const newList = await tx
      .insert(lists)
      .values([
        { name: "Экипировка" },
        { name: "Документы" },
        { name: "Другое" },
      ])
      .returning();

    console.log("Inserting tasks");

    await tx.insert(tasks).values([
      { name: "Паспорт", description: "Паспорт", listId: 2 },
      {
        name: "Паспорт марафонца",
        description: "Паспорт марафонца",
        listId: 2,
      },
      {
        name: "Справка Допуск",
        description: "Справка Допуск",
        listId: 2,
      },
      { name: "Страховка", description: "Страховка", listId: 2 },
      { name: "Полис", description: "Полис", listId: 2 },
      { name: "Банковская карта", description: "Банковская карта", listId: 2 },
    ]);
  });
  //  AsyncStorage.setItemSync("dbInitialized", "true");
}
