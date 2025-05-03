import { useMutation, useQuery } from "@tanstack/react-query";
import { eq, sql } from "drizzle-orm";
import { dates, type DateType } from "@/db/schema/dates.schema";
import { useDatabase } from "./useDatabase";

//Get all dates
export function useDates() {
  const { drizzleDb } = useDatabase();
  return useQuery({
    queryKey: ["dates"],
    queryFn: async () => {
      const data = await drizzleDb.query.dates.findMany();
      return data;
    },
  });
}

//Get date by id

export function useDateById(id: number) {
  const { drizzleDb } = useDatabase();
  return useQuery({
    queryKey: ["dates", id],
    queryFn: async () => {
      const data = await drizzleDb
        .select()
        .from(dates)
        .where(eq(dates.id, id))
        //.leftJoin(tasks, eq(lists.id, tasks.list_id))
        .orderBy(dates.id);
      if (!data) return;

      return data;
    },
  });
}

//Get date by date

export function useDateByDate(date: string) {
  const { drizzleDb } = useDatabase();
  return useQuery({
    queryKey: ["dates", date],
    queryFn: async () => {
      const data = await drizzleDb.query.dates.findFirst({
        where: eq(dates.date, date),
        with: {
          lists: true,
        },
      });
      if (!data) throw new Error("Date not found");
      return data;
    },
    enabled: !!date,
  });
}

// Get date by range
//
export function useDatesByRange(startDate: string, endDate: string) {
  const { drizzleDb } = useDatabase();

  return useQuery({
    queryKey: ["dates-in-range"],
    queryFn: async () => {
      const result = await drizzleDb
        .select()
        .from(dates)
        .where(
          sql`strftime('%Y-%m-%d', date) BETWEEN ${startDate} AND ${endDate}`,
        );

      return result;
    },
  });
}

//Create date mutation

export function useCreateDate() {
  const { drizzleDb, queryClient } = useDatabase();

  const createDate = useMutation({
    mutationFn: async ({ date, title }: DateType) => {
      const [newDate] = await drizzleDb
        .insert(dates)
        .values({ date, title })
        .returning();
      return newDate;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["dates"] });
      queryClient.invalidateQueries({
        queryKey: ["dates-in-range"],
        exact: true,
        refetchType: "active",
      });
    },
  });
  return createDate;
}

// Update date mutation

export function useUpdateDate() {
  const { drizzleDb, queryClient } = useDatabase();
  return useMutation({
    mutationFn: async ({ id, ...data }: DateType) => {
      const [updatedDate] = await drizzleDb
        .update(dates)
        .set(data)
        .where(eq(dates.id, id))
        .returning();
      return updatedDate;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["dates"] });
      queryClient.invalidateQueries({ queryKey: ["dates", data.id] });
    },
  });
}

export function useDeleteDate() {
  const { drizzleDb, queryClient } = useDatabase();

  return useMutation({
    mutationFn: async (id: number) => {
      await drizzleDb.delete(dates).where(eq(dates.id, id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dates"] });
    },
  });
}

export function useDeleteDateByDate() {
  const { drizzleDb, queryClient } = useDatabase();

  return useMutation({
    mutationFn: async (date: string) => {
      await drizzleDb.delete(dates).where(eq(dates.date, date));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dates"] });
    },
  });
}
