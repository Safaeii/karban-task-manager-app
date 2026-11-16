
import { useEffect, useState } from "react";

import StatsCard from "../components/StatsCard";
import KanbanBoard from "../components/KanbanBoard";

import { useAuthContext } from "../../auth/hooks/useAuthContext";

import {
  getTasks,
  createTask,
  updateTaskStatus,
  deleteTask,
} from "../../api/tasksApi";

import type {
  Task,
  TaskPriority,
  TaskStatus,
} from "../../tasks/types/task";

import CreateTaskForm from "../../tasks/components/CreateTaskForm";

function DashboardPage() {
  const { user, loading } = useAuthContext();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // دریافت وظایف از Supabase
  useEffect(() => {
    async function loadTasks() {
      if (!user) {
        setTasks([]);
        setLoadingTasks(false);
        return;
      }

      try {
        setLoadingTasks(true);
        setError(null);

        const data = await getTasks(user.id);

        setTasks(data);
      } catch (err) {
        console.error("خطا در دریافت وظایف:", err);
        setError("دریافت وظایف با مشکل مواجه شد.");
      } finally {
        setLoadingTasks(false);
      }
    }

    if (!loading) {
      loadTasks();
    }
  }, [user, loading]);

  // ثبت وظیفه جدید
  async function handleCreateTask(task: {
    title: string;
    description: string;
    priority: TaskPriority;
  }) {
    if (!user) return;

    try {
      setError(null);

      const newTask = await createTask(user.id, task);

      setTasks((prevTasks) => [newTask, ...prevTasks]);
    } catch (err) {
      console.error("خطا در ثبت وظیفه:", err);
      setError("ثبت وظیفه با مشکل مواجه شد.");
    }
  }

  // تغییر وضعیت وظیفه با Drag & Drop
  async function handleTaskStatusChange(
    taskId: string,
    newStatus: TaskStatus
  ) {
    if (!user) return;

    const previousTask = tasks.find(
      (task) => task.id === taskId
    );

    if (!previousTask || previousTask.status === newStatus) {
      return;
    }

    // تغییر فوری وضعیت در رابط کاربری
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? { ...task, status: newStatus }
          : task
      )
    );

    try {
      setError(null);

      // ذخیره وضعیت جدید در Supabase
      await updateTaskStatus(
        taskId,
        user.id,
        newStatus
      );
    } catch (err) {
      console.error("خطا در تغییر وضعیت:", err);

      // بازگرداندن وضعیت قبلی در صورت خطا
      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === taskId
            ? { ...task, status: previousTask.status }
            : task
        )
      );

      setError("تغییر وضعیت وظیفه ذخیره نشد.");
    }
  }

  // حذف وظیفه
  async function handleDeleteTask(taskId: string) {
    const confirmed = window.confirm(
      "آیا از حذف این وظیفه مطمئن هستی؟"
    );

    if (!confirmed || !user) return;

    try {
      setError(null);

      await deleteTask(taskId, user.id);

      setTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== taskId)
      );
    } catch (err) {
      console.error("خطا در حذف وظیفه:", err);
      setError("حذف وظیفه با مشکل مواجه شد.");
    }
  }

  // محاسبه آمار
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "done"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "todo"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "in-progress"
  ).length;

  // بررسی وضعیت احراز هویت
  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        در حال بررسی وضعیت حساب کاربری...
      </div>
    );
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen space-y-6 bg-[#F8FAFC] p-3 sm:p-4 md:p-6 lg:p-8"
    >
      {/* Header */}
      <div>
        <p className="mb-2 text-sm text-gray-500">
          ایمیل کاربر: {user?.email ?? "کاربری وارد نشده است"}
        </p>

        <h1 className="text-xl font-bold text-[#26364A] sm:text-2xl">
          داشبورد کاربان
        </h1>

        <p className="mt-2 text-sm text-[#8493A5]">
          به پنل مدیریت وظایف خوش آمدید.
        </p>
      </div>

      {/* Loading */}
      {loadingTasks && (
        <div className="rounded-xl border border-[#E8EEF5] bg-white p-6 text-center text-gray-500">
          در حال دریافت وظایف...
        </div>
      )}

      {/* Create Task Form */}
      {!loadingTasks && user && (
        <CreateTaskForm onSubmit={handleCreateTask} />
      )}

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {!loadingTasks && !error && (
        <>
          {/* Statistics */}
          <section>
            <h2 className="mb-4 text-lg font-bold text-[#26364A]">
              خلاصه وضعیت وظایف
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatsCard
                title="کل وظایف"
                value={totalTasks}
                color="text-blue-600"
              />

              <StatsCard
                title="انجام شده"
                value={completedTasks}
                color="text-green-600"
              />

              <StatsCard
                title="باقی‌مانده"
                value={pendingTasks}
                color="text-orange-600"
              />

              <StatsCard
                title="در حال انجام"
                value={inProgressTasks}
                color="text-indigo-600"
              />
            </div>
          </section>

          {/* Kanban Board */}
          <section className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-lg font-bold text-[#26364A]">
                برد مدیریت وظایف
              </h2>

              <span className="text-sm text-gray-500">
                {totalTasks} وظیفه
              </span>
            </div>

            {tasks.length === 0 ? (
              <div className="rounded-xl border border-[#E8EEF5] bg-white p-8 text-center">
                <p className="font-medium text-[#26364A]">
                  هنوز وظیفه‌ای ثبت نکرده‌ای.
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  اولین وظیفه خودت را از فرم بالا اضافه کن.
                </p>
              </div>
            ) : (
              <KanbanBoard
                tasks={tasks}
                onStatusChange={handleTaskStatusChange}
                onDelete={handleDeleteTask}
              />
            )}
          </section>
        </>
      )}
    </main>
  );
}

export default DashboardPage;
