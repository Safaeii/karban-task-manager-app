import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import type { Task } from "../types/task";






function TasksStatusChart({ tasks }: { tasks: Task[] }) {

const doneTasks = tasks.filter(
  (task) => task.status === "done"
).length;

const inProgressTasks = tasks.filter(
  (task) => task.status === "in-progress"
).length;

const todoTasks = tasks.filter(
  (task) => task.status === "todo"
).length;


const chartData = [
  { name: "انجام‌شده", value: doneTasks },
    { name: "در حال انجام", value: inProgressTasks },
      { name: "شروع‌نشده", value: todoTasks }
];
const COLORS = ["#16A36A", "#D69A35", "#7DA9D8"];


  return(
    <main>
<ResponsiveContainer width="100%" height={280}>
  <PieChart>
<Pie
  data={chartData}
  dataKey="value"
  nameKey="name"
  cx="50%"
  cy="50%"
  outerRadius={100}
>
  {chartData.map((entry, index) => (
    <Cell key={entry.name} fill={COLORS[index]} />
  ))}
</Pie>
<Tooltip />
  </PieChart>
</ResponsiveContainer>
    </main>
  )
}

export default TasksStatusChart