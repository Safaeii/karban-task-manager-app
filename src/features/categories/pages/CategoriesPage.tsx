
import { useEffect, useState } from "react";

import { useAuthContext } from "../../auth/hooks/useAuthContext";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../api/categoriesApi";

import { getTasks } from "../../api/tasksApi";

import type { Category } from "../types/category";
import type { Task } from "../../tasks/types/task";

import CategoryCard from "../components/CategoryCard";
import CreateCategoryForm from "../components/CreateCategoryForm";

function CategoriesPage() {
  const { user } = useAuthContext();

  const [categories, setCategories] = useState<Category[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

const [loading, setLoading] = useState(false);
const [loadedUserId, setLoadedUserId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] =
    useState<Category | null>(null);
  const [search, setSearch] = useState("");

  // دریافت دسته‌بندی‌ها و وظایف
useEffect(() => {
  if (!user?.id) return;

  const userId = user.id;
  let isActive = true;

  async function loadData() {
    try {
      setLoading(true);

      const [categoriesData, tasksData] = await Promise.all([
        getCategories(userId),
        getTasks(userId),
      ]);

      if (!isActive) return;

      setCategories(categoriesData);
      setTasks(tasksData);
      setLoadedUserId(userId);
    } catch (error) {
      if (isActive) {
        console.error("Error loading categories:", error);
      }
    } finally {
      if (isActive) {
        setLoading(false);
      }
    }
  }

  loadData();

  return () => {
    isActive = false;
  };
}, [user?.id]);

  // افزودن دسته‌بندی
  async function handleCreateCategory(data: {
    name: string;
    color: string;
    icon: string;
  }) {
    if (!user?.id) return;

    try {
      const newCategory = await createCategory(user.id, data);

      setCategories((prev) => [...prev, newCategory]);
      setShowForm(false);
    } catch (error) {
      console.error("Error creating category:", error);
    }
  }

  // ویرایش دسته‌بندی
  async function handleUpdateCategory(
    categoryId: string,
    data: {
      name: string;
      color: string;
      icon: string;
    }
  ) {
    if (!user?.id) return;

    try {
      const updatedCategory = await updateCategory(
        categoryId,
        user.id,
        data
      );

      setCategories((prev) =>
        prev.map((category) =>
          category.id === categoryId ? updatedCategory : category
        )
      );

      setEditingCategory(null);
      setShowForm(false);
    } catch (error) {
      console.error("Error updating category:", error);
    }
  }

  // حذف دسته‌بندی
  async function handleDeleteCategory(categoryId: string) {
    if (!user?.id) return;

    const confirmed = window.confirm(
      "آیا از حذف این دسته‌بندی مطمئن هستید؟"
    );

    if (!confirmed) return;

    try {
      await deleteCategory(categoryId, user.id);

      setCategories((prev) =>
        prev.filter((category) => category.id !== categoryId)
      );

      setTasks((prev) =>
        prev.map((task) =>
          task.categoryId === categoryId
            ? { ...task, categoryId: null }
            : task
        )
      );
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  }

  // جست‌وجوی دسته‌بندی‌ها
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  // محاسبه تعداد وظایف هر دسته‌بندی
  function getCategoryTaskCount(categoryId: string) {
    return tasks.filter(
      (task) => task.categoryId === categoryId
    ).length;
  }

  return (
    <main dir="rtl" className="space-y-6">

      {/* عنوان صفحه */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#26364A]">
            دسته‌بندی‌ها
          </h1>

          <p className="mt-2 text-sm text-[#8493A5]">
            وظایف خودت رو بر اساس دسته‌بندی مدیریت کن.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setEditingCategory(null);
            setShowForm(true);
          }}
          className="rounded-xl bg-[#7DA9D8] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#6897C9]"
        >
          + افزودن دسته‌بندی
        </button>
      </div>

      {/* فرم افزودن و ویرایش */}
      {showForm && (
        <CreateCategoryForm
          initialCategory={editingCategory}
          onSubmit={(data) => {
            if (editingCategory) {
              handleUpdateCategory(editingCategory.id, data);
            } else {
              handleCreateCategory(data);
            }
          }}
          onCancel={() => {
            setShowForm(false);
            setEditingCategory(null);
          }}
        />
      )}

      {/* جست‌وجوی دسته‌بندی‌ها */}
      <div className="rounded-2xl border border-[#E8EEF5] bg-white p-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="جست‌وجوی دسته‌بندی..."
          className="w-full bg-transparent text-sm text-[#26364A] outline-none placeholder:text-[#8493A5]"
        />
      </div>

      {/* نمایش دسته‌بندی‌ها */}
{!user?.id || loadedUserId !== user.id || loading ? (
  <div className="py-12 text-center text-[#8493A5]">
    در حال دریافت دسته‌بندی‌ها...
  </div>
) : filteredCategories.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#E8EEF5] bg-white py-12 text-center">
          <p className="font-medium text-[#26364A]">
            دسته‌بندی‌ای پیدا نشد
          </p>

          <p className="mt-2 text-sm text-[#8493A5]">
            می‌تونی یک دسته‌بندی جدید ایجاد کنی.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredCategories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              taskCount={getCategoryTaskCount(category.id)}
              onEdit={(category) => {
                setEditingCategory(category);
                setShowForm(true);
              }}
              onDelete={handleDeleteCategory}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default CategoriesPage;
