import * as schema from "@/db/schema";
import { useQueryClient } from "@tanstack/react-query";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { useSQLiteContext } from "expo-sqlite";

export function useDatabase() {
  const queryClient = useQueryClient();
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });

  return { drizzleDb, queryClient };
}
