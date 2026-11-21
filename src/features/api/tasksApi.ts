
import { supabase } from "../../shared/services/supabase";
import type { Task, TaskPriority, TaskStatus } from "../tasks/types/task";

// دریافت تمام وظایف کاربر
export async function getTasks(userId: string): Promise<Task[]> {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data.map((task) => ({
    id: task.id,
    title: task.title,
    description: task.description ?? "",
    status: task.status,
    priority: task.priority,
    categoryId: task.category_id ?? null,
    createdAt: task.created_at,
  }));
}

// تغییر وضعیت وظیفه
export async function updateTaskStatus(
  taskId: string,
  userId: string,
  status: TaskStatus
): Promise<void> {
  const { error } = await supabase
    .from("tasks")
    .update({ status })
    .eq("id", taskId)
    .eq("user_id", userId);

  if (error) {
    throw error;
  }
}

// ایجاد وظیفه جدید
export async function createTask(
  userId: string,
  task: {
    title: string;
    description: string;
    priority: TaskPriority;
    categoryId: string | null;
  }
): Promise<Task> {
  const { data, error } = await supabase
    .from("tasks")
    .insert({
      user_id: userId,
      title: task.title,
      description: task.description,
      priority: task.priority,
      category_id: task.categoryId,
      status: "todo",
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return {
    id: data.id,
    title: data.title,
    description: data.description ?? "",
    status: data.status,
    priority: data.priority,
    categoryId: data.category_id ?? null,
    createdAt: data.created_at,
  };
}

// ویرایش وظیفه
export async function updateTask(
  taskId: string,
  userId: string,
  task: {
    title: string;
    description: string;
    priority: TaskPriority;
    categoryId: string | null;
  }
): Promise<Task> {
  const { data, error } = await supabase
    .from("tasks")
    .update({
      title: task.title,
      description: task.description,
      priority: task.priority,
      category_id: task.categoryId,
    })
    .eq("id", taskId)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return {
    id: data.id,
    title: data.title,
    description: data.description ?? "",
    status: data.status,
    priority: data.priority,
    categoryId: data.category_id ?? null,
    createdAt: data.created_at,
  };
}

// حذف وظیفه
export async function deleteTask(
  taskId: string,
  userId: string
): Promise<void> {
  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", taskId)
    .eq("user_id", userId);

  if (error) {
    throw error;
  }
}
