import { useEffect, useRef, useState, type FC } from "react";

import { MdCalendarToday, MdOutlineMoreHoriz } from "react-icons/md";

import Card from "../shared/Card";
import Chip from "../shared/Chip";
import { getPriorityUIConfig, getTaskStatusUIConfig } from "../../utils/helper";
import type { Task } from "../../types/task";

interface TaskCardProps {
  taskDetails: Task;
  onDeleteTask: (taskId: string) => void;
  onUpdateTask: (taskId: string) => void;
}

const TaskCard: FC<TaskCardProps> = ({
  taskDetails,
  onDeleteTask,
  onUpdateTask,
}) => {
  const {
    taskStatusBgColor,
    taskStatusBorderColor,
    taskStatusColor,
    taskStatusLabel,
  } = getTaskStatusUIConfig(taskDetails);

  const { priorityBgColor, priorityBorderColor, priorityColor, priorityLabel } =
    getPriorityUIConfig(taskDetails);

  const TaskDropdown = ({
    onEdit,
    onDelete,
  }: {
    onEdit: () => void;
    onDelete: () => void;
  }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // Close dropdown on outside click
    useEffect(() => {
      function handleClickOutside(event: globalThis.MouseEvent) {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          setOpen(false);
        }
      }
      if (open) document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);

    return (
      <div className="relative" ref={ref}>
        <div
          className="flex justify-between items-center p-2 hover:bg-gray-100 hover:bg-opacity-20 rounded-lg cursor-pointer"
          onClick={() => setOpen((prev) => !prev)}
        >
          <MdOutlineMoreHoriz size={24} />
        </div>
        {/* Dropdown */}
        <div
          className={`absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border border-gray-100 transition-all duration-200 origin-top-right z-20 ${
            open
              ? "opacity-100 scale-100 pointer-events-auto"
              : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          <button
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-t-lg transition"
            onClick={() => {
              setOpen(false);
              onEdit();
            }}
          >
            Edit Task
          </button>
          <button
            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-b-lg transition"
            onClick={() => {
              setOpen(false);
              onDelete();
            }}
          >
            Delete Task
          </button>
        </div>
      </div>
    );
  };

  return (
    <Card>
      <div className="flex flex-col">
        <div className="w-full flex flex-row justify-between items-center">
          <p className="text-xl font-bold">{taskDetails.title}</p>
          <TaskDropdown
            onEdit={() => onUpdateTask(taskDetails.id)}
            onDelete={() => onDeleteTask(taskDetails.id)}
          />
        </div>
        {taskDetails.description && (
          <div className="w-full">
            <p className="text-sm">{taskDetails.description}</p>
          </div>
        )}
        <div className="w-full flex justify-between items-center my-2">
          <Chip
            bgColor={taskStatusBgColor}
            borderColor={taskStatusBorderColor}
            textColor={taskStatusColor}
            title={taskStatusLabel}
          />
          <Chip
            bgColor={priorityBgColor}
            borderColor={priorityBorderColor}
            textColor={priorityColor}
            title={priorityLabel}
          />
        </div>
        <div className="w-full flex justify-between items-center my-2">
          <div className="flex flex-col items-start">
            <p className="text-sm">Start Date</p>
            <p className="text-sm flex mt-1 items-center">
              <MdCalendarToday className="text-gray-500 mr-2" />
              {taskDetails.startDate.toLocaleDateString()}
            </p>
          </div>
          <div className="flex flex-col items-start">
            <p className="text-sm">Due Date</p>
            <p className="text-sm flex mt-1 items-center">
              <MdCalendarToday className="text-gray-500 mr-2" />
              {taskDetails.dueDate.toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
