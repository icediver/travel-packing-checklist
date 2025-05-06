import { useMutation, useQuery } from "@tanstack/react-query";
import { eq } from "drizzle-orm";
import { useDatabase } from "./useDatabase";
import { tasks, TaskType } from "@/db/schema/tasks.schema";

export function useTasks() {
  const { db } = useDatabase();

  // Fetch Tasks
  return useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const data = await db.query.tasks.findMany();
      return data;
    },
  });
}

// Get Task by ID
export function useTask(id: number) {
  const { db } = useDatabase();

  return useQuery({
    queryKey: ["tasks", id],
    queryFn: async () => {
      const [task] = await db.select().from(tasks).where(eq(tasks.id, id));
      return task;
    },
    enabled: !!id,
  });
}

//Create Task mutation
export function useCreateTask() {
  const { db, queryClient } = useDatabase();
  return useMutation({
    mutationFn: async (data: Omit<TaskType, "id">) => {
      const createTask = await db.insert(tasks).values(data).returning();
      return createTask;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["lists"] });
    },
  });
}

//Update task mutation

export const useUpdateTask = () => {
  const { db, queryClient } = useDatabase();
  return useMutation({
    mutationFn: async ({ id, ...data }: TaskType) => {
      const [updateTask] = await db
        .update(tasks)
        .set(data)
        .where(eq(tasks.id, id))
        .returning();
      return updateTask;
    },
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["tasks", data.id] });
    },
  });
};

//Delete task mutation

export const useDeleteTask = () => {
  const { db, queryClient } = useDatabase();
  return useMutation({
    mutationFn: async (id: number) => {
      await db.delete(tasks).where(eq(tasks.id, id));
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
