import { PROJECT_UI_STATUS_MAP, PRIORITY_MAP, TASK_UI_STATUS_MAP } from "./constants";
import type { Project } from "../types/project";
import type { Task } from "../types/task";

export const getProjectStatusUIConfig = (projectDetails: Project) => {
  const defaultBgColor = "bg-gray-200";
  const defaultColor = "text-gray-600";
  const defaultBorderColor = "border-gray-300";

  const projectStatusBgColor =
    PROJECT_UI_STATUS_MAP[projectDetails.status]?.bgColor || defaultBgColor;
  const projectStatusColor =
    PROJECT_UI_STATUS_MAP[projectDetails.status]?.color || defaultColor;
  const projectStatusBorderColor =
    PROJECT_UI_STATUS_MAP[projectDetails.status]?.borderColor ||
    defaultBorderColor;
  const projectStatusLabel =
    PROJECT_UI_STATUS_MAP[projectDetails.status]?.label || "Unknown Status";

  return {
    projectStatusBgColor,
    projectStatusColor,
    projectStatusBorderColor,
    projectStatusLabel,
  };
};

export const getPriorityUIConfig = (details: Project | Task) => {
  const defaultBgColor = "bg-gray-200";
  const defaultColor = "text-gray-600";
  const defaultBorderColor = "border-gray-300";

  const priorityBgColor =
    PRIORITY_MAP[details.priority]?.bgColor || defaultBgColor;
  const priorityColor =
    PRIORITY_MAP[details.priority]?.color || defaultColor;
  const priorityBorderColor =
    PRIORITY_MAP[details.priority]?.borderColor ||
    defaultBorderColor;
  const priorityLabel =
    PRIORITY_MAP[details.priority]?.label || "Unknown Priority";

  return {
    priorityBgColor,
    priorityColor,
    priorityBorderColor,
    priorityLabel,
  };
};

export const getTaskStatusUIConfig = (taskDetails: Task) => {
  const defaultBgColor = "bg-gray-200";
  const defaultColor = "text-gray-600";
  const defaultBorderColor = "border-gray-300";

  const taskStatusBgColor =
    TASK_UI_STATUS_MAP[taskDetails.status]?.bgColor || defaultBgColor;
  const taskStatusColor =
    TASK_UI_STATUS_MAP[taskDetails.status]?.color || defaultColor;
  const taskStatusBorderColor =
    TASK_UI_STATUS_MAP[taskDetails.status]?.borderColor ||
    defaultBorderColor;
  const taskStatusLabel =
    TASK_UI_STATUS_MAP[taskDetails.status]?.label || "Unknown Status";

  return {
    taskStatusBgColor,
    taskStatusColor,
    taskStatusBorderColor,
    taskStatusLabel,
  };
};
