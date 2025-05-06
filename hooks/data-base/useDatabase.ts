import * as schema from "@/db/schema";
import { useQueryClient } from "@tanstack/react-query";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect } from "react";

export function useDatabase() {
  const queryClient = useQueryClient();
  const sqlite = useSQLiteContext();
  const db = drizzle(sqlite, {
    schema,
    logger: process.env.NODE_ENV === "development", // Логирование в dev-режиме
  });

  // Настройка оптимизации SQLite при первом подключении
  useEffect(() => {
    const initDatabase = async () => {
      try {
        // Включаем WAL mode для лучшей производительности
        await sqlite.execAsync(`
          PRAGMA journal_mode = WAL;
          PRAGMA synchronous = NORMAL;
          PRAGMA foreign_keys = ON;
        `);

        if (process.env.NODE_ENV === "development") {
          console.log("SQLite database optimized with WAL mode");
        }
      } catch (error) {
        console.error("Failed to optimize SQLite:", error);
      }
    };

    initDatabase();
  }, [sqlite]);

  return {
    db,
    queryClient,
    sqlite, // Экспортируем и raw-интерфейс для сложных операций
  };
}
