
import tasks from "../../tasks/data/tasks";

export const totalTasks = tasks.length;

export const completedTasks = tasks.filter(
  (task) => task.status === "done"
).length;

export const pendingTasks = tasks.filter(
  (task) => task.status !== "done"
).length;
