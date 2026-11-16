
import {
  DndContext,
  useDraggable,
  useDroppable,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";

import { CSS } from "@dnd-kit/utilities";
import { FiTrash2 } from "react-icons/fi";

import type { Task, TaskStatus } from "../../tasks/types/task";

// ستون‌های کانبان
const columns: { id: TaskStatus; title: string }[] = [
  { id: "todo", title: "انجام‌نشده" },
  { id: "in-progress", title: "در حال انجام" },
  { id: "done", title: "انجام‌شده" },
];

// کارت قابل کشیدن
function DraggableTaskCard({
  task,
  onDelete,
}: {
  task: Task;
  onDelete: (taskId: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: task.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="touch-none cursor-grab rounded-xl border border-[#E8EEF5] bg-white p-4 shadow-sm transition hover:shadow-md active:cursor-grabbing"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="min-w-0 font-semibold text-[#26364A]">
          {task.title}
        </h3>

        <button
          type="button"
          onPointerDown={(event) => event.stopPropagation()}
          onClick={(event) => {
            event.stopPropagation();
            onDelete(task.id);
          }}
          className="shrink-0 rounded-lg p-2 text-red-500 transition hover:bg-red-50"
          aria-label="حذف وظیفه"
          title="حذف وظیفه"
        >
          <FiTrash2 size={17} />
        </button>
      </div>

      <p className="mt-2 text-sm leading-6 text-[#8493A5]">
        {task.description || "بدون توضیحات"}
      </p>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-[#8493A5]">
          اولویت:
        </span>

        <span
          className={`rounded-lg px-2 py-1 text-xs ${
            task.priority === "high"
              ? "bg-red-50 text-red-600"
              : task.priority === "medium"
                ? "bg-yellow-50 text-yellow-600"
                : "bg-green-50 text-green-600"
          }`}
        >
          {task.priority === "high"
            ? "زیاد"
            : task.priority === "medium"
              ? "متوسط"
              : "کم"}
        </span>
      </div>
    </div>
  );
}

// ستون قابل رها کردن
function DroppableColumn({
  id,
  title,
  tasks,
  onDelete,
}: {
  id: TaskStatus;
  title: string;
  tasks: Task[];
  onDelete: (taskId: string) => void;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`min-h-[350px] min-w-0 rounded-2xl border p-3 transition sm:p-4 ${
        isOver
          ? "border-[#7DA9D8] bg-[#DCEBFA]"
          : "border-[#E8EEF5] bg-[#F1F5F9]"
      }`}
    >
      <div className="mb-4 flex items-center justify-between gap-2">
        <h2 className="text-sm font-bold text-[#26364A] sm:text-base">
          {title}
        </h2>

        <span className="rounded-full bg-white px-3 py-1 text-xs text-[#8493A5]">
          {tasks.length}
        </span>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <DraggableTaskCard
            key={task.id}
            task={task}
            onDelete={onDelete}
          />
        ))}

        {tasks.length === 0 && (
          <div className="rounded-xl border border-dashed border-[#D5DFEA] py-8 text-center">
            <p className="text-xs text-[#8493A5]">
              وظیفه‌ای وجود ندارد
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// پراپرتی‌های برد کانبان
interface KanbanBoardProps {
  tasks: Task[];
  onStatusChange: (
    taskId: string,
    status: TaskStatus
  ) => void;
  onDelete: (taskId: string) => void;
}

// برد اصلی کانبان
function KanbanBoard({
  tasks,
  onStatusChange,
  onDelete,
}: KanbanBoardProps) {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 8,
      },
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const taskId = String(active.id);
    const newStatus = String(over.id) as TaskStatus;

    const task = tasks.find(
      (item) => item.id === taskId
    );

    if (!task || task.status === newStatus) return;

    onStatusChange(taskId, newStatus);
  }

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
    >
      <div
        dir="rtl"
        className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-3 lg:gap-5"
      >
        {columns.map((column) => (
          <DroppableColumn
            key={column.id}
            id={column.id}
            title={column.title}
            tasks={tasks.filter(
              (task) => task.status === column.id
            )}
            onDelete={onDelete}
          />
        ))}
      </div>
    </DndContext>
  );
}

export default KanbanBoard;
