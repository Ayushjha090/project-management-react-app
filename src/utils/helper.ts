import { PROJECT_UI_STATUS_MAP, PROJECT_UI_PRIORITY_MAP } from "./constants";
import type { Project } from "../types/project";

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

export const getProjectPriorityUIConfig = (projectDetails: Project) => {
  const defaultBgColor = "bg-gray-200";
  const defaultColor = "text-gray-600";
  const defaultBorderColor = "border-gray-300";

  const projectPriorityBgColor =
    PROJECT_UI_PRIORITY_MAP[projectDetails.priority]?.bgColor || defaultBgColor;
  const projectPriorityColor =
    PROJECT_UI_PRIORITY_MAP[projectDetails.priority]?.color || defaultColor;
  const projectPriorityBorderColor =
    PROJECT_UI_PRIORITY_MAP[projectDetails.priority]?.borderColor ||
    defaultBorderColor;
  const projectPriorityLabel =
    PROJECT_UI_PRIORITY_MAP[projectDetails.priority]?.label || "Unknown Priority";

  return {
    projectPriorityBgColor,
    projectPriorityColor,
    projectPriorityBorderColor,
    projectPriorityLabel,
  };
};
