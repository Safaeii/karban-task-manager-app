
import { useEffect, useRef, useState } from "react";

import StatsCard from "../components/StatsCard";
import KanbanBoard from "../components/KanbanBoard";

import { useAuthContext } from "../../auth/hooks/useAuthContext";

import {
  getTasks,
  createTask,
  updateTask,
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
  const { user } = useAuthContext();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const formRef = useRef<HTMLDivElement>(null);

  // دریافت وظایف
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

  // ایجاد وظیفه
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
      console.error("خطا در ایجاد وظیفه:", err);
      setError("ایجاد وظیفه با مشکل مواجه شد.");
    }
  }

  // ذخیره ویرایش وظیفه
  async function handleSaveTask(task: {
    title: string;
    description: string;
    priority: TaskPriority;
  }) {
    if (!user || !editingTask) return;

    try {
      setError(null);

      const updatedTask = await updateTask(
        editingTask.id,
        user.id,
        task
      );

      setTasks((prevTasks) =>
        prevTasks.map((item) =>
          item.id === updatedTask.id ? updatedTask : item
        )
      );

      setEditingTask(null);
    } catch (err) {
      console.error("خطا در ویرایش وظیفه:", err);
      setError("ویرایش وظیفه با مشکل مواجه شد.");
    }
  }

  // تغییر وضعیت وظیفه
  async function handleTaskStatusChange(
    taskId: string,
    status: TaskStatus
  ) {
    if (!user) return;

    try {
      setError(null);

      await updateTaskStatus(taskId, user.id, status);

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status } : task
        )
      );
    } catch (err) {
      console.error("خطا در تغییر وضعیت وظیفه:", err);
      setError("تغییر وضعیت وظیفه با مشکل مواجه شد.");
    }
  }

  // حذف وظیفه
  async function handleDeleteTask(taskId: string) {
    if (!user) return;

    const confirmed = window.confirm(
      "آیا از حذف این وظیفه مطمئن هستید؟"
    );

    if (!confirmed) return;

    try {
      setError(null);

      await deleteTask(taskId, user.id);

      setTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== taskId)
      );

      if (editingTask?.id === taskId) {
        setEditingTask(null);
      }
    } catch (err) {
      console.error("خطا در حذف وظیفه:", err);
      setError("حذف وظیفه با مشکل مواجه شد.");
    }
  }

  // انتخاب وظیفه برای ویرایش و اسکرول به فرم
  function handleEditTask(task: Task) {
    setEditingTask(task);

    requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });
  }

  return (
    <main dir="rtl" className="space-y-6">
      {/* عنوان داشبورد */}
      <div>
        <h1 className="text-2xl font-bold text-[#26364A]">
          داشبورد مدیریت وظایف
        </h1>

        <p className="mt-2 text-sm text-[#8493A5]">
          وظایف خودت رو مدیریت و پیگیری کن.
        </p>
      </div>

      {/* نمایش خطا */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* آمار وظایف */}
<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
  <StatsCard
    title="کل وظایف"
    value={tasks.length}
    color="#7DA9D8"
  />

  <StatsCard
    title="وظایف انجام‌شده"
    value={tasks.filter((task) => task.status === "done").length}
    color="#687653"
  />

  <StatsCard
    title="وظایف در حال انجام"
    value={
      tasks.filter((task) => task.status === "in-progress").length
    }
    color="#E5A45B"
  />
</div>

      {/* فرم ایجاد و ویرایش */}
      {!loadingTasks && user && (
        <div ref={formRef} className="scroll-mt-8">
          <CreateTaskForm
            key={editingTask?.id ?? "new-task"}
            initialTask={editingTask}
            onSubmit={
              editingTask ? handleSaveTask : handleCreateTask
            }
            onCancel={() => setEditingTask(null)}
          />
        </div>
      )}

      {/* برد وظایف */}
      {loadingTasks ? (
        <div className="py-10 text-center text-[#8493A5]">
          در حال دریافت وظایف...
        </div>
      ) : (
        <KanbanBoard
          tasks={tasks}
          onStatusChange={handleTaskStatusChange}
          onDelete={handleDeleteTask}
          onEdit={handleEditTask}
        />
      )}
    </main>
  );
}

export default DashboardPage;

