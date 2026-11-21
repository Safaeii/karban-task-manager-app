
import type { Category } from "../types/category";

import {
  FiEdit2,
  FiTrash2,
  FiBriefcase,
  FiBookOpen,
  FiHeart,
  FiDollarSign,
  FiUser,
  FiFolder,
} from "react-icons/fi";

interface CategoryCardProps {
  category: Category;
  taskCount: number;
  onEdit: (category: Category) => void;
  onDelete: (categoryId: string) => void;
}

const categoryIcons = {
  briefcase: FiBriefcase,
  "book-open": FiBookOpen,
  "heart-pulse": FiHeart,
  wallet: FiDollarSign,
  user: FiUser,
  folder: FiFolder,
};

function CategoryCard({
  category,
  taskCount,
  onEdit,
  onDelete,
}: CategoryCardProps) {
  const Icon =
    categoryIcons[category.icon as keyof typeof categoryIcons] ??
    FiFolder;

  return (
    <div className="rounded-2xl border border-[#E8EEF5] bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      {/* آیکون و اطلاعات دسته‌بندی */}
      <div className="flex items-center gap-3">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
          style={{
            backgroundColor: `${category.color}20`,
            color: category.color,
          }}
        >
          <Icon size={23} />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate font-bold text-[#26364A]">
            {category.name}
          </h3>

          <p className="mt-1 text-sm text-[#8493A5]">
            {taskCount} وظیفه
          </p>
        </div>
      </div>

      {/* جداکننده */}
      <div className="my-5 border-t border-[#E8EEF5]" />

      {/* دکمه‌های عملیات */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onEdit(category)}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#F1F6FC] px-3 py-2.5 text-sm font-medium text-[#527FAE] transition hover:bg-[#E4EFFB]"
        >
          <FiEdit2 size={16} />
          ویرایش
        </button>

        <button
          type="button"
          onClick={() => onDelete(category.id)}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-50 px-3 py-2.5 text-sm font-medium text-red-500 transition hover:bg-red-100"
        >
          <FiTrash2 size={16} />
          حذف
        </button>
      </div>
    </div>
  );
}

export default CategoryCard;
