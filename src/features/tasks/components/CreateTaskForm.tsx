
import { useState, type FormEvent } from "react";
import type { Task, TaskPriority } from "../types/task";

interface CreateTaskFormProps {
  onSubmit: (task: {
    title: string;
    description: string;
    priority: TaskPriority;
  }) => void;

  initialTask?: Task | null;
  onCancel?: () => void;
}

function CreateTaskForm({
  onSubmit,
  initialTask,
  onCancel,
}: CreateTaskFormProps) {
  const [title, setTitle] = useState(initialTask?.title ?? "");

  const [description, setDescription] = useState(
    initialTask?.description ?? ""
  );

  const [priority, setPriority] = useState<TaskPriority>(
    initialTask?.priority ?? "medium"
  );

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      priority,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      dir="rtl"
      className="w-full rounded-2xl border border-[#E8EEF5] bg-white p-5 shadow-sm sm:p-6"
    >
      <h2 className="mb-5 text-lg font-bold text-[#26364A]">
        {initialTask ? "ویرایش وظیفه" : "افزودن وظیفه جدید"}
      </h2>

      <div className="space-y-4">
        {/* عنوان وظیفه */}
        <div>
          <label className="mb-2 block text-sm font-medium text-[#26364A]">
            عنوان وظیفه
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="مثلاً طراحی صفحه ورود"
            required
            className="w-full rounded-xl border border-[#E8EEF5] bg-[#F8FAFC] px-4 py-3 text-sm outline-none transition focus:border-[#7DA9D8] focus:ring-2 focus:ring-[#7DA9D8]/20"
          />
        </div>

        {/* توضیحات */}
        <div>
          <label className="mb-2 block text-sm font-medium text-[#26364A]">
            توضیحات
          </label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="توضیحات وظیفه را وارد کنید..."
            rows={3}
            className="w-full resize-none rounded-xl border border-[#E8EEF5] bg-[#F8FAFC] px-4 py-3 text-sm outline-none transition focus:border-[#7DA9D8] focus:ring-2 focus:ring-[#7DA9D8]/20"
          />
        </div>

        {/* اولویت */}
        <div>
          <label className="mb-2 block text-sm font-medium text-[#26364A]">
            اولویت وظیفه
          </label>

          <select
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value as TaskPriority)
            }
            className="w-full rounded-xl border border-[#E8EEF5] bg-[#F8FAFC] px-4 py-3 text-sm outline-none transition focus:border-[#7DA9D8]"
          >
            <option value="low">کم</option>
            <option value="medium">متوسط</option>
            <option value="high">زیاد</option>
          </select>
        </div>

        {/* دکمه‌ها */}
        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={!title.trim()}
            className="w-full rounded-xl bg-[#7DA9D8] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#6796C9] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            {initialTask ? "ذخیره تغییرات" : "افزودن وظیفه"}
          </button>

          {initialTask && (
            <button
              type="button"
              onClick={onCancel}
              className="w-full rounded-xl border border-[#E8EEF5] px-5 py-3 text-sm font-semibold text-[#8493A5] transition hover:bg-[#F8FAFC] sm:w-auto"
            >
              انصراف
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

export default CreateTaskForm;
