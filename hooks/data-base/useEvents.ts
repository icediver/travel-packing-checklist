import { useMutation, useQuery } from "@tanstack/react-query";
import { and, eq } from "drizzle-orm";
import { dates, type DateType } from "@/db/schema/dates.schema";
import { useDatabase } from "./useDatabase";
import { events, lists, ListType } from "@/db/schema";

//Get all events
export function useEvents() {
  const { db } = useDatabase();
  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const data = await db.query.events.findMany({
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

//Get date by id

//Get date by date

export function useEventByDate(date: string) {
  const { db } = useDatabase();
  return useQuery({
    queryKey: ["events", date],
    queryFn: async () => {
      const dateEvent = await db.query.dates.findFirst({
        where: eq(dates.date, date),
      });

      if (!dateEvent) return;
      const result = await db.query.events.findMany({
        where: eq(events.dateId, dateEvent.id),
        with: {
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

export function useEventByList(listId: number) {
  const { db } = useDatabase();
  return useQuery({
    queryKey: ["events", listId],
    queryFn: async () => {
      const data = await db.query.events.findMany({
        where: eq(events.listId, listId),
        with: {
          date: true,
          list: true,
        },
      });
      return data;
    },
  });
}

//Insert List  mutation

export function useEventInsertList({
  date,
  listId,
}: {
  date: string;
  listId: number;
}) {
  const { db, queryClient } = useDatabase();

  const createDate = useMutation({
    mutationFn: async ({
      dateId,
      listId,
    }: {
      dateId: number;
      listId: number;
    }) => {
      await db.insert(events).values({ listId, dateId }).returning();
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
  return createDate;
}

export function useDeleteEvent({
  date,
  listId,
}: {
  date: DateType;
  listId: number;
}) {
  const { db, queryClient } = useDatabase();
  return useMutation({
    mutationFn: async () => {
      await db
        .delete(events)
        .where(and(eq(events.dateId, date.id), eq(events.listId, listId)));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
}

// Update date mutation
