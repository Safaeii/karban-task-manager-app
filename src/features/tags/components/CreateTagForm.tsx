
import { useState } from "react";
import type { Tag } from "../types/tag";

interface CreateTagFormProps {
  initialTag: Tag | null;
  onSubmit: (tag: { name: string; color: string }) => void;
  onCancel: () => void;
}

const colors = [
  "#7DA9D8",
  "#9B8AD8",
  "#70B58A",
  "#E5B65C",
  "#D58BA8",
  "#E07A5F",
  "#5BA4A4",
  "#8493A5",
];

function CreateTagForm({
  initialTag,
  onSubmit,
  onCancel,
}: CreateTagFormProps) {
  const [name, setName] = useState(initialTag?.name ?? "");
  const [color, setColor] = useState(
    initialTag?.color ?? "#7DA9D8"
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name.trim()) return;

    onSubmit({
      name: name.trim(),
      color,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl border border-[#E8EEF5] bg-white p-5"
    >
      <h2 className="text-lg font-bold text-[#26364A]">
        {initialTag ? "ویرایش برچسب" : "افزودن برچسب"}
      </h2>

      <div>
        <label className="mb-2 block text-sm font-medium text-[#26364A]">
          نام برچسب
        </label>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="مثلاً فوری"
          required
          className="w-full rounded-xl border border-[#E8EEF5] px-4 py-3 text-sm outline-none transition focus:border-[#7DA9D8]"
        />
      </div>

      <div>
        <label className="mb-3 block text-sm font-medium text-[#26364A]">
          رنگ برچسب
        </label>

        <div className="flex flex-wrap gap-3">
          {colors.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setColor(item)}
              className={`h-9 w-9 rounded-full border-2 transition ${
                color === item
                  ? "scale-110 border-[#26364A]"
                  : "border-transparent"
              }`}
              style={{ backgroundColor: item }}
              aria-label={`انتخاب رنگ ${item}`}
            />
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
          {initialTag ? "ذخیره تغییرات" : "افزودن برچسب"}
        </button>
      </div>
    </form>
  );
}

export default CreateTagForm;
