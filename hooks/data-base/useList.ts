import { useMutation, useQuery } from "@tanstack/react-query";
import { eq, sql } from "drizzle-orm";
import { useDatabase } from "./useDatabase";
import { lists, ListType } from "@/db/schema/lists.schema";
import { TaskType, tasks } from "@/db/schema/tasks.schema";
import { useSeeds } from "./useSeeds";

//Get all lists
export function useLists() {
  const { db } = useDatabase();
  return useQuery({
    queryKey: ["lists"],
    queryFn: async () => {
      const data = await db.query.lists.findMany();
      return data;
    },
  });
}

//Get list by id

export function useList(id: number) {
  const { db } = useDatabase();

  return useQuery({
    queryKey: ["lists", id],
    queryFn: async () => {
      //const data: { lists: ListType; tasks: TaskType | null }[] =
      //  await db
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

      const result = await db.query.lists.findFirst({
        where: eq(lists.id, id),
        with: {
          tasks: {
            orderBy: (tasks, { asc }) => [asc(tasks.id)],
          },
        },
      });

      if (!result) {
        throw new Error("List not found");
      }

      return result;
    },
  });
}

//Create list mutation

export function useCreateList() {
  const { db, queryClient } = useDatabase();
  return useMutation({
    mutationFn: async (list: Omit<ListType, "id">) => {
      const [newList] = await db.insert(lists).values(list).returning();

      if (!newList) {
        throw new Error("Failed to create list");
      }

      return newList;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["lists"] });
    },
    onError: (error) => {
      console.error("Create list error:", error);
    },
  });
}

// Update list mutation

export function useUpdateList() {
  const { db, queryClient } = useDatabase();

  return useMutation({
    mutationFn: async ({ id, ...data }: ListType) => {
      const [updatedList] = await db
        .update(lists)
        .set(data)
        .where(eq(lists.id, id))
        .returning();

      if (!updatedList) {
        throw new Error("Failed to update list");
      }

      return updatedList;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["lists"] });
      queryClient.invalidateQueries({ queryKey: ["lists", data.id] });
    },
    onError: (error) => {
      console.error("Update list error:", error);
    },
  });
}

export function useDeleteList() {
  const { db, queryClient } = useDatabase();

  return useMutation({
    mutationFn: async (id: number) => {
      await db.delete(lists).where(eq(lists.id, id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists"] });
    },

    onError: (error) => {
      console.error("Delete list error:", error);
    },
  });
}
