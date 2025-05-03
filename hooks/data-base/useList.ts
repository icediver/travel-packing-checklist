import { useMutation, useQuery } from "@tanstack/react-query";
import { eq, sql } from "drizzle-orm";
import { useDatabase } from "./useDatabase";
import { lists, ListType } from "@/db/schema/lists.schema";
import { TaskType, tasks } from "@/db/schema/tasks.schema";

//Get all lists
export function useLists() {
  const { drizzleDb } = useDatabase();
  return useQuery({
    queryKey: ["lists"],
    queryFn: async () => {
      const data = await drizzleDb.query.lists.findMany();
      return data;
    },
  });
}

//Get list by id

export function useList(id: number) {
  const { drizzleDb } = useDatabase();

  return useQuery({
    queryKey: ["lists", id],
    queryFn: async () => {
      //const data: { lists: ListType; tasks: TaskType | null }[] =
      //  await drizzleDb
      //    .select()
      //    .from(lists)
      //    .where(eq(lists.id, id))
      //    .innerJoin(tasks, eq(lists.id, tasks.list_id))
      //    .orderBy(tasks.id);
      //const modifiedTasks = data
      //  .map((list) => {
      //    return list.tasks;
      //  })
      //  .filter((task) => task !== null && task !== undefined) as TaskType[];
      //if (!tasks) return;
      //
      //const list = data[0].lists;
      //
      //const result = {
      //  list,
      //  tasks: modifiedTasks,
      //};

      const result = await drizzleDb.query.lists.findFirst({
        where: eq(lists.id, id),
        with: {
          tasks: {
            orderBy: tasks.id,
          },
        },
      });

      return result;
    },
  });
}

//Create list mutation

export function useCreateList() {
  const { drizzleDb, queryClient } = useDatabase();
  return useMutation({
    mutationFn: async (list: Omit<ListType, "id">) => {
      const [newList] = await drizzleDb.insert(lists).values(list).returning();

      return newList;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["lists"] });
    },
  });
}

// Update list mutation

export function useUpdateList() {
  const { drizzleDb, queryClient } = useDatabase();
  return useMutation({
    mutationFn: async ({ id, ...data }: ListType) => {
      const [updatedList] = await drizzleDb
        .update(lists)
        .set(data)
        .where(eq(lists.id, id))
        .returning();
      return updatedList;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["lists"] });
      queryClient.invalidateQueries({ queryKey: ["lists", data.id] });
    },
  });
}

export function useDeleteList() {
  const { drizzleDb, queryClient } = useDatabase();

  return useMutation({
    mutationFn: async (id: number) => {
      await drizzleDb.delete(lists).where(eq(lists.id, id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists"] });
    },
  });
}
