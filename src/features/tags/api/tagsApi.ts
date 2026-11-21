
import { supabase } from "../../../shared/services/supabase";
import type { Tag } from "../types/tag";

// ساختار اطلاعات دریافتی از دیتابیس
interface TagRow {
  id: string;
  user_id: string;
  name: string;
  color: string;
  created_at: string;
}

// تبدیل اطلاعات دیتابیس به مدل TypeScript
function mapTag(data: TagRow): Tag {
  return {
    id: data.id,
    userId: data.user_id,
    name: data.name,
    color: data.color,
    createdAt: data.created_at,
  };
}

// دریافت برچسب‌های کاربر
export async function getTags(userId: string): Promise<Tag[]> {
  const { data, error } = await supabase
    .from("tags")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (error) throw error;

  return data.map(mapTag);
}

// ایجاد برچسب جدید
export async function createTag(
  userId: string,
  tag: { name: string; color: string }
): Promise<Tag> {
  const { data, error } = await supabase
    .from("tags")
    .insert({
      user_id: userId,
      name: tag.name,
      color: tag.color,
    })
    .select()
    .single();

  if (error) throw error;

  return mapTag(data);
}

// ویرایش برچسب
export async function updateTag(
  tagId: string,
  userId: string,
  tag: { name: string; color: string }
): Promise<Tag> {
  const { data, error } = await supabase
    .from("tags")
    .update({
      name: tag.name,
      color: tag.color,
    })
    .eq("id", tagId)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) throw error;

  return mapTag(data);
}

// حذف برچسب
export async function deleteTag(
  tagId: string,
  userId: string
): Promise<void> {
  const { error } = await supabase
    .from("tags")
    .delete()
    .eq("id", tagId)
    .eq("user_id", userId);

  if (error) throw error;
}
