
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import type { Task } from "../types/task";

function TasksTrendChart({ tasks }: { tasks: Task[] }) {
  const chartData = [];

  const today = new Date();

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    const dayTasks = tasks.filter((task) => {
      const taskDate = new Date(task.createdAt);

      return (
        taskDate.getDate() === date.getDate() &&
        taskDate.getMonth() === date.getMonth() &&
        taskDate.getFullYear() === date.getFullYear()
      );
    });

    chartData.push({
      day: date.toLocaleDateString("fa-IR", {
        weekday: "short",
      }),
      tasks: dayTasks.length,
    });
  }

  return (
    <section className="w-full">
      <ResponsiveContainer width="100%" height={280}>
        <LineChart
          data={chartData}
          margin={{ top: 15, right: 10, left: -15, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#E8EEF5"
          />

          <XAxis
            dataKey="day"
            tick={{ fill: "#8493A5", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            allowDecimals={false}
            tick={{ fill: "#8493A5", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="tasks"
            name="تعداد وظایف"
            stroke="#7DA9D8"
            strokeWidth={3}
            dot={{ r: 5, fill: "#7DA9D8" }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
}

export default TasksTrendChart;
