import { useState } from "react";
import type { Category } from "../types/category";
import {
  FiBriefcase,
  FiBookOpen,
  FiHeart,
  FiDollarSign,
  FiUser,
  FiFolder,
} from "react-icons/fi";

 interface CreateCategoryFormProps {
  initialCategory: Category | null;
  onSubmit: (category: {
    name: string;
    color: string;
    icon: string;
  }) => void;
  onCancel: () => void;
}

function CreateCategoryForm({
  initialCategory,
  onSubmit,
  onCancel,
}: CreateCategoryFormProps) {
    const [name, setName] = useState(initialCategory?.name ?? "");
const [color, setColor] = useState(initialCategory?.color ?? "#7DA9D8");
const [icon, setIcon] = useState(initialCategory?.icon ?? "folder");

function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  if (!name.trim()) return;

  onSubmit({
    name: name.trim(),
    color,
    icon,
  });
}

return(
  <form
    onSubmit={handleSubmit}
    className="space-y-5 rounded-2xl bg-white p-5"
  >
    <h2 className="text-lg font-bold text-[#26364A]">
      {initialCategory ? "ویرایش دسته‌بندی" : "افزودن دسته‌بندی"}
    </h2>
<div>
  <label className="mb-2 block text-sm font-medium text-[#26364A]">
    نام دسته‌بندی
  </label>

  <input
    type="text"
    value={name}
    onChange={(e) => setName(e.target.value)}
    placeholder="مثلاً پروژه‌های کاری"
    required
    className="w-full rounded-xl border border-[#E8EEF5] px-4 py-3 text-sm outline-none transition focus:border-[#7DA9D8]"
  />
</div>
<div>
  <label className="mb-3 block text-sm font-medium text-[#26364A]">
    رنگ دسته‌بندی
  </label>

  <div className="flex flex-wrap items-center gap-3">
    {[
      "#7DA9D8",
      "#9B8AD8",
      "#70B58A",
      "#E5B65C",
      "#D58BA8",
      "#E07A5F",
      "#5BA4A4",
      "#8493A5",
    ].map((item) => (
      <button
        key={item}
        type="button"
        onClick={() => setColor(item)}
        className={`h-9 w-9 rounded-full border-2 transition ${
          color === item ? "scale-110 border-[#26364A]" : "border-transparent"
        }`}
        style={{ backgroundColor: item }}
        aria-label={`انتخاب رنگ ${item}`}
      />
    ))}
  </div>
</div>
<div>
  <label className="mb-3 block text-sm font-medium text-[#26364A]">
    آیکون دسته‌بندی
  </label>

  <div className="flex flex-wrap gap-3">
    {[
      { name: "briefcase", Icon: FiBriefcase },
      { name: "book-open", Icon: FiBookOpen },
      { name: "heart-pulse", Icon: FiHeart },
      { name: "wallet", Icon: FiDollarSign },
      { name: "user", Icon: FiUser },
      { name: "folder", Icon: FiFolder },
    ].map(({ name: iconName, Icon }) => (
      <button
        key={iconName}
        type="button"
        onClick={() => setIcon(iconName)}
        className={`flex h-11 w-11 items-center justify-center rounded-xl border transition ${
          icon === iconName
            ? "border-[#7DA9D8] bg-[#F1F6FC] text-[#527FAE]"
            : "border-[#E8EEF5] text-[#8493A5] hover:bg-[#F8FAFC]"
        }`}
        aria-label={`انتخاب آیکون ${iconName}`}
      >
        <Icon size={20} />
      </button>
    ))}
  </div>
</div>
<div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
  <button
    type="button"
    onClick={onCancel}
    className="rounded-xl border border-[#E8EEF5] px-5 py-3 text-sm font-medium text-[#8493A5] transition hover:bg-[#F8FAFC]"
  >
    انصراف
  </button>

  <button
    type="submit"
    className="rounded-xl bg-[#7DA9D8] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#6897C9]"
  >
    {initialCategory ? "ذخیره تغییرات" : "افزودن دسته‌بندی"}
  </button>
</div>
  </form>
)
}

export default CreateCategoryForm;
