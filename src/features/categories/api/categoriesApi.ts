
import { supabase } from "../../../shared/services/supabase";
import type { Category } from "../types/category";

// ساختار اطلاعات دریافتی از دیتابیس
interface CategoryRow {
  id: string;
  user_id: string;
  name: string;
  color: string;
  icon: string;
  created_at: string;
}

// دسته‌بندی‌های پیش‌فرض کاربان
const defaultCategories = [
  {
    name: "کار و شغل",
    color: "#7DA9D8",
    icon: "briefcase",
  },
  {
    name: "آموزش و یادگیری",
    color: "#9B8AD8",
    icon: "book-open",
  },
  {
    name: "سلامتی و ورزش",
    color: "#70B58A",
    icon: "heart-pulse",
  },
  {
    name: "مالی",
    color: "#E5B65C",
    icon: "wallet",
  },
  {
    name: "کارهای شخصی",
    color: "#D58BA8",
    icon: "user",
  },
];

// تبدیل اطلاعات دیتابیس به Category
function mapCategory(data: CategoryRow): Category {
  return {
    id: data.id,
    userId: data.user_id,
    name: data.name,
    color: data.color,
    icon: data.icon,
    createdAt: data.created_at,
  };
}

// دریافت دسته‌بندی‌های کاربر
export async function getCategories(
  userId: string
): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (error) throw error;

  return data.map(mapCategory);
}

// ایجاد دسته‌بندی جدید
export async function createCategory(
  userId: string,
  category: {
    name: string;
    color: string;
    icon: string;
  }
): Promise<Category> {
  const { data, error } = await supabase
    .from("categories")
    .insert({
      user_id: userId,
      name: category.name,
      color: category.color,
      icon: category.icon,
    })
    .select()
    .single();

  if (error) throw error;

  return mapCategory(data);
}

// ویرایش دسته‌بندی
export async function updateCategory(
  categoryId: string,
  userId: string,
  category: {
    name: string;
    color: string;
    icon: string;
  }
): Promise<Category> {
  const { data, error } = await supabase
    .from("categories")
    .update({
      name: category.name,
      color: category.color,
      icon: category.icon,
    })
    .eq("id", categoryId)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) throw error;

  return mapCategory(data);
}

// حذف دسته‌بندی
export async function deleteCategory(
  categoryId: string,
  userId: string
): Promise<void> {
  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", categoryId)
    .eq("user_id", userId);

  if (error) throw error;
}

// ایجاد دسته‌بندی‌های پیش‌فرض بدون تکرار
export async function ensureDefaultCategories(
  userId: string
): Promise<void> {
  const { data, error } = await supabase
    .from("categories")
    .select("name")
    .eq("user_id", userId);

  if (error) throw error;

  const existingNames = new Set(
    data.map((category) => category.name)
  );

  const missingCategories = defaultCategories.filter(
    (category) => !existingNames.has(category.name)
  );

  if (missingCategories.length === 0) return;

  const { error: insertError } = await supabase
    .from("categories")
    .insert(
      missingCategories.map((category) => ({
        user_id: userId,
        name: category.name,
        color: category.color,
        icon: category.icon,
      }))
    );

  if (insertError) throw insertError;
}
