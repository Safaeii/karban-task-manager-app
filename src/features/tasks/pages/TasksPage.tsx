import { useEffect, useState } from "react";

import { useAuthContext } from "../../auth/hooks/useAuthContext";

import { getTasks } from "../../api/tasksApi";

import type { Task } from "../types/task";

import TasksStatusChart from "../components/TasksStatusChart";

import TasksTrendChart from "../components/TasksTrendChart";

function TasksPage() {

 const [tasks, setTasks] = useState<Task[]>([]);

  const [loadingTasks, setLoadingTasks] = useState(true);

 const [error, setError] = useState<string | null>(null);

const { user } = useAuthContext();

useEffect(() => {
  if (!user) return;

  const userId = user.id;
  let isMounted = true;

  async function loadTasks() {
    try {
      setLoadingTasks(true);
      setError(null);

      const data = await getTasks(userId);

      if (isMounted) {
        setTasks(data);
      }
    } catch (err) {
      console.error("خطا در دریافت وظایف:", err);

      if (isMounted) {
        setError("دریافت وظایف با مشکل مواجه شد.");
      }
    } finally {
      if (isMounted) {
        setLoadingTasks(false);
      }
    }
  }

  loadTasks();

  return () => {
    isMounted = false;
  };
}, [user]);


return (
  <main dir="rtl" className="space-y-6 p-4 sm:p-6">

    {/* عنوان صفحه */}
    <div>
      <h1 className="text-2xl font-bold text-[#26364A]">
        وظایف من
      </h1>
      <p className="mt-2 text-sm text-[#8493A5]">
        مدیریت و بررسی وضعیت تمام وظایف شما
      </p>
    </div>

    {/* نمایش خطا */}
    {error && (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
        {error}
      </div>
    )}

    {loadingTasks ? (
      <div className="py-12 text-center text-[#8493A5]">
        در حال دریافت وظایف...
      </div>
    ) : (
      <>
        {/* ردیف اول: تعداد کل و نمودار دایره‌ای */}
        <section className="rounded-2xl border border-[#E8EEF5] bg-white p-4 sm:p-6">
          <div className="flex flex-col items-center gap-4 sm:flex-row">

            {/* تعداد کل وظایف */}
            <div className="flex w-full flex-col justify-center sm:w-2/5">
              <p className="text-sm text-[#8493A5]">
                تعداد کل وظایف
              </p>

              <p className="mt-3 text-4xl font-bold text-[#7DA9D8] sm:text-5xl">
                {tasks.length}
              </p>

              <p className="mt-2 text-sm text-[#8493A5]">
                تمام وظایف ثبت‌شده شما
              </p>
            </div>

            {/* نمودار دایره‌ای بزرگ */}
            <div className="w-full min-w-0 sm:w-3/5">
              <h2 className="mb-2 text-center text-sm font-bold text-[#26364A]">
                وضعیت وظایف
              </h2>

              <TasksStatusChart tasks={tasks} />
            </div>

          </div>
        </section>

        {/* ردیف دوم: نمودار خطی */}
        <section className="rounded-2xl border border-[#E8EEF5] bg-white p-4 sm:p-6">
          <div className="mb-5">
            <h2 className="font-bold text-[#26364A]">
              روند ثبت وظایف
            </h2>

            <p className="mt-1 text-sm text-[#8493A5]">
              تعداد وظایف ایجادشده در ۷ روز اخیر
            </p>
          </div>

          <TasksTrendChart tasks={tasks} />
        </section>

        {/* ردیف سوم: لیست وظایف */}
        <section className="rounded-2xl border border-[#E8EEF5] bg-white p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-bold text-[#26364A]">
              لیست وظایف
            </h2>

            <span className="rounded-lg bg-[#DCEBFA] px-3 py-1 text-sm text-[#537CA8]">
              {tasks.length} وظیفه
            </span>
          </div>

          {tasks.length === 0 ? (
            <div className="py-10 text-center text-sm text-[#8493A5]">
              هنوز وظیفه‌ای ثبت نکرده‌اید.
            </div>
          ) : (
       
<div className="space-y-3">
  {tasks.map((task) => (
    <div
      key={task.id}
      className="rounded-xl border border-[#E8EEF5] p-4 transition hover:border-[#7DA9D8] hover:shadow-sm"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

        {/* اطلاعات وظیفه */}
        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-[#26364A]">
            {task.title}
          </h3>

          <p className="mt-2 text-sm text-[#8493A5]">
            {task.description || "بدون توضیحات"}
          </p>

          <p className="mt-2 text-xs text-[#8493A5]">
            تاریخ ایجاد:{" "}
            {new Date(task.createdAt).toLocaleDateString("fa-IR")}
          </p>
        </div>

        {/* وضعیت و اولویت */}
        <div className="flex flex-wrap items-center gap-2">

          <span
            className={`rounded-lg px-3 py-1.5 text-xs font-medium ${
              task.status === "done"
                ? "bg-green-100 text-green-700"
                : task.status === "in-progress"
                  ? "bg-amber-100 text-amber-700"
                  : "bg-blue-100 text-blue-700"
            }`}
          >
            {task.status === "done"
              ? "انجام‌شده"
              : task.status === "in-progress"
                ? "در حال انجام"
                : "شروع‌نشده"}
          </span>

          <span
            className={`rounded-lg px-3 py-1.5 text-xs font-medium ${
              task.priority === "high"
                ? "bg-red-100 text-red-700"
                : task.priority === "medium"
                  ? "bg-orange-100 text-orange-700"
                  : "bg-gray-100 text-gray-600"
            }`}
          >
            {task.priority === "high"
              ? "اولویت زیاد"
              : task.priority === "medium"
                ? "اولویت متوسط"
                : "اولویت کم"}
          </span>

        </div>
      </div>
    </div>
  ))}
</div>

          )}
        </section>
      </>
    )}

  </main>
);

}

export default TasksPage;