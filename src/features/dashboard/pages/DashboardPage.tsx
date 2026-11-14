
import tasks from "../../tasks/data/tasks";
import StatsCard from "../components/StatsCard";
import { useAuthContext } from "../../auth/hooks/useAuthContext";

import {totalTasks ,completedTasks,pendingTasks } from "../../dashboard/utils/dashboardStats"



function DashboardPage() {
  const { user } = useAuthContext();
  return (
    <main className="p-3 sm:p-4 md:p-6 lg:p-8 space-y-6">
<p className="text-sm text-gray-500 mt-2">
  ایمیل کاربر: {user?.email ?? "کاربری وارد نشده است"}
</p>
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
          داشبورد کاربان
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          به پنل مدیریت وظایف خوش آمدید.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
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
      </div>

      {/* Task List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="w-full bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
          >
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              {task.title}
            </h3>

            <p className="text-sm text-gray-500 leading-6">
              {task.description}
            </p>

            <div className="flex flex-wrap items-center gap-2 mt-4">
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  task.status === "done"
                    ? "bg-green-100 text-green-700"
                    : task.status === "in-progress"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-700"
                }`}
              >
                {task.status === "done"
                  ? "انجام شده"
                  : task.status === "in-progress"
                    ? "در حال انجام"
                    : "انجام نشده"}
              </span>

              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  task.priority === "high"
                    ? "bg-red-100 text-red-700"
                    : task.priority === "medium"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-green-100 text-green-700"
                }`}
              >
                {task.priority === "high"
                  ? "زیاد"
                  : task.priority === "medium"
                    ? "متوسط"
                    : "کم"}
              </span>
            </div>

            <p className="text-xs text-gray-400 mt-3">
              تاریخ ایجاد: {task.createdAt}
            </p>
          </div>
        ))}
      </div>

    </main>
  );
}

export default DashboardPage;
