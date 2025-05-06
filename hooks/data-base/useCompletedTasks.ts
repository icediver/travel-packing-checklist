import { useMutation, useQuery } from "@tanstack/react-query";
import { and, eq } from "drizzle-orm";
import { dates, type DateType } from "@/db/schema/dates.schema";
import { useDatabase } from "./useDatabase";
import { CompletedTasksType, events, lists, ListType } from "@/db/schema";
import { completedTasks } from "@/db/schema";
import { useDateByDate } from "./useDates";
import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";

//Get all events
export function useCompletedTasks() {
  const { db } = useDatabase();
  return useQuery({
    queryKey: ["completed-tasks"],
    queryFn: async () => {
      const data = await db.query.completedTasks.findMany({
        with: {
          date: true,
          list: {
            with: {
              tasks: true,
            },
          },
        },
      });
      return data;
    },
  });
}

//Get completed tasks by Date

export function useCompletedTasksByDate(date: string) {
  const { db } = useDatabase();

  return useQuery({
    queryKey: ["completed-tasks", date],
    queryFn: async () => {
      const data = await db.query.dates.findFirst({
        where: eq(dates.date, date),
      });

      if (!data) throw new Error("Date not found");

      const result = await db.query.completedTasks.findMany({
        where: eq(completedTasks.dateId, data.id),
        with: {
          date: true,
          list: {
            with: {
              tasks: true,
            },
          },
        },
      });
      return result;
    },
  });
}

//Get completed task

export function useCompletedTask({
  taskId,
  dateId,
  listId,
}: {
  taskId: number;
  dateId: number;
  listId: number;
}) {
  const { db } = useDatabase();

  return useQuery({
    queryKey: ["completed-tasks", taskId, dateId, listId],
    queryFn: async () => {
      const data = await db.query.completedTasks.findFirst({
        where: and(
          eq(completedTasks.taskId, taskId),
          eq(completedTasks.dateId, dateId),
          eq(completedTasks.listId, listId),
        ),
      });
      if (!data) throw new Error("Date not found");
      return data;
    },
    enabled: !!taskId && !!dateId && !!listId,
  });
}

//Insert comleted task  mutation

export function useAddCompletedTask() {
  const { db, queryClient } = useDatabase();

  const createDate = useMutation({
    mutationFn: async ({
      dateId,
      listId,
      taskId,
    }: {
      dateId: number;
      listId: number;
      taskId: number;
    }) => {
      await db
        .insert(completedTasks)
        .values({ taskId, listId, dateId })
        .returning();
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["completed-tasks"] });
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
  return createDate;
}

//Delete completed task

export function useDeleteCompletedTask() {
  const { db, queryClient } = useDatabase();
  return useMutation({
    mutationFn: async ({
      date,
      listId,
      taskId,
    }: {
      date: DateType;
      listId: number;
      taskId: number;
    }) => {
      await db
        .delete(completedTasks)
        .where(
          and(
            eq(completedTasks.dateId, date.id),
            eq(completedTasks.listId, listId),
            eq(completedTasks.taskId, taskId),
          ),
        );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["completed-tasks"] });
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
}
