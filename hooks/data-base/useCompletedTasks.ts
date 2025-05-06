import { useMutation, useQuery } from "@tanstack/react-query";
import { and, eq, inArray } from "drizzle-orm";
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
          event: {
            with: {
              date: true,
              list: {
                with: {
                  tasks: true,
                },
              },
            },
          },
        },
      });

      if (!data) throw new Error("Date not found");

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
      // 1. Сначала находим запись даты
      const dateRecord = await db.query.dates.findFirst({
        where: eq(dates.date, date),
      });

      if (!dateRecord) throw new Error("Дата не найдена");

      // 2. Находим все события на эту дату
      const eventsOnDate = await db.query.events.findMany({
        where: eq(events.dateId, dateRecord.id),
        columns: { id: true }, // Берем только ID событий
      });

      if (eventsOnDate.length === 0) return [];

      // 3. Ищем выполненные задачи для этих событий
      const result = await db.query.completedTasks.findMany({
        where: inArray(
          completedTasks.eventId,
          eventsOnDate.map((e) => e.id),
        ),
        with: {
          task: true, // Прямая связь с задачей
          event: {
            with: {
              list: true, // Список через событие
              date: true,
            },
          },
        },
      });

      // 4. Форматируем результат для удобства
      return result.map((item) => ({
        ...item,
        list: item.event.list, // "Разворачиваем" список
        date: item.event.date, // "Разворачиваем" дату
      }));
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
      // 1. Сначала находим соответствующее событие
      const event = await db.query.events.findFirst({
        where: and(eq(events.dateId, dateId), eq(events.listId, listId)),
        columns: { id: true }, // Нам нужен только ID события
      });

      if (!event) throw new Error("Событие не найдено");

      // 2. Ищем выполненную задачу для этого события
      const completedTask = await db.query.completedTasks.findFirst({
        where: and(
          eq(completedTasks.taskId, taskId),
          eq(completedTasks.eventId, event.id),
        ),
        with: {
          task: true, // Добавляем связанную задачу
          event: {
            with: {
              date: true, // Добавляем связанную дату
              list: true, // Добавляем связанный список
            },
          },
        },
      });

      if (!completedTask) throw new Error("Выполненная задача не найдена");

      // 3. Возвращаем с объединенными данными
      return {
        ...completedTask,
        date: completedTask.event.date,
        list: completedTask.event.list,
      };
    },
    enabled: !!taskId && !!dateId && !!listId,
  });
}
//Insert comleted task  mutation

export function useAddCompletedTask() {
  const { db, queryClient } = useDatabase();

  const addCompletedTask = useMutation({
    mutationFn: async ({
      taskId,
      dateId,
      listId,
    }: {
      taskId: number;
      dateId: number;
      listId: number;
    }) => {
      // 1. Сначала находим или создаем событие
      const [event] = await db
        .insert(events)
        .values({ listId, dateId })
        .onConflictDoNothing() // Если событие уже существует
        .returning({ id: events.id });

      if (!event) {
        // Если событие уже существует, получаем его ID
        const existingEvent = await db.query.events.findFirst({
          where: and(eq(events.listId, listId), eq(events.dateId, dateId)),
          columns: { id: true },
        });
        if (!existingEvent)
          throw new Error("Не удалось найти или создать событие");

        // 2. Создаем запись о выполненной задаче
        const [completedTask] = await db
          .insert(completedTasks)
          .values({
            taskId,
            eventId: existingEvent.id,
          })
          .returning();

        return completedTask;
      }

      // 2. Создаем запись о выполненной задаче (если событие было создано)
      const [completedTask] = await db
        .insert(completedTasks)
        .values({
          taskId,
          eventId: event.id,
        })
        .returning();

      return completedTask;
    },
    onSuccess: () => {
      // Обновляем кэш запросов
      queryClient.invalidateQueries({ queryKey: ["completed-tasks"] });
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.error("Ошибка при добавлении выполненной задачи:", error);
    },
  });

  return addCompletedTask;
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
      // 1. Находим соответствующее событие
      const event = await db.query.events.findFirst({
        where: and(eq(events.dateId, date.id), eq(events.listId, listId)),
        columns: { id: true },
      });

      if (!event) throw new Error("Событие не найдено");

      // 2. Удаляем выполненную задачу
      await db
        .delete(completedTasks)
        .where(
          and(
            eq(completedTasks.taskId, taskId),
            eq(completedTasks.eventId, event.id),
          ),
        );
    },
    onSuccess: (_, variables) => {
      // Инвалидируем кэш для обновления UI
      queryClient.invalidateQueries({
        queryKey: ["completed-tasks", variables.date.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["events", variables.listId, variables.date.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["tasks", variables.listId],
      });
    },
    onError: (error) => {
      console.error("Error deleting completed task:", error);
    },
  });
}
