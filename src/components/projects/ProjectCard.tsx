import type { FC } from "react";

import { MdOutlineMoreHoriz } from "react-icons/md";
import { MdCalendarToday } from "react-icons/md";
import { MdAddchart } from "react-icons/md";

import Card from "../shared/Card";
import type { Project } from "../../types/project";

interface ProjectCardProps {
  projectDetails: Project;
  onSelectProject: (projectId: string) => void;
  onDeleteProject: (projectId: string) => void;
  onUpdateProject: (projectId: string) => void;
}

const PROJECT_STATUS_MAP: Record<string, Record<string, string>> = {
  "in-progress": {
    label: "In Progress",
    color: "text-blue-600",
    bgColor: "bg-blue-200",
    borderColor: "border-blue-300",
  },
  planning: {
    label: "Planning",
    color: "text-yellow-600",
    bgColor: "bg-yellow-200",
    borderColor: "border-yellow-300",
  },
  "on-hold": {
    label: "On Hold",
    color: "text-gray-600",
    bgColor: "bg-gray-200",
    borderColor: "border-gray-300",
  },
  completed: {
    label: "Completed",
    color: "text-green-600",
    bgColor: "bg-green-200",
    borderColor: "border-green-300",
  },
  cancelled: {
    label: "Cancelled",
    color: "text-red-600",
    bgColor: "bg-red-200",
    borderColor: "border-red-300",
  },
};

const PROJECT_PRIORITY_MAP: Record<string, Record<string, string>> = {
  low: {
    label: "Low",
    color: "text-green-600",
    bgColor: "bg-green-200",
    borderColor: "border-green-300",
  },
  medium: {
    label: "Medium",
    color: "text-yellow-600",
    bgColor: "bg-yellow-200",
    borderColor: "border-yellow-300",
  },
  high: {
    label: "High",
    color: "text-red-600",
    bgColor: "bg-red-200",
    borderColor: "border-red-300",
  },
  critical: {
    label: "Critical",
    color: "text-purple-600",
    bgColor: "bg-purple-200",
    borderColor: "border-purple-300",
  },
};

const ProjectCard: FC<ProjectCardProps> = ({
  projectDetails,
  onSelectProject,
  onDeleteProject,
  onUpdateProject,
}) => {
  const defaultBgColor = "bg-gray-200";
  const defaultColor = "text-gray-600";
  const defaultBorderColor = "border-gray-300";

  const projectStatusBgColor =
    PROJECT_STATUS_MAP[projectDetails.status]?.bgColor || defaultBgColor;
  const projectStatusColor =
    PROJECT_STATUS_MAP[projectDetails.status]?.color || defaultColor;
  const projectStatusBorderColor =
    PROJECT_STATUS_MAP[projectDetails.status]?.borderColor ||
    defaultBorderColor;
  const projectStatusLabel =
    PROJECT_STATUS_MAP[projectDetails.status]?.label || "Unknown Status";

  const projectPriorityBgColor =
    PROJECT_PRIORITY_MAP[projectDetails.priority]?.bgColor || defaultBgColor;
  const projectPriorityColor =
    PROJECT_PRIORITY_MAP[projectDetails.priority]?.color || defaultColor;
  const projectPriorityBorderColor =
    PROJECT_PRIORITY_MAP[projectDetails.priority]?.borderColor ||
    defaultBorderColor;
  const projectPriorityLabel =
    PROJECT_PRIORITY_MAP[projectDetails.priority]?.label || "Unknown Priority";

  const totalCompletedTasks = projectDetails.tasks.reduce((acc, task) => {
    return acc + (task.status.toLowerCase() === "done" ? 1 : 0);
  }, 0);

  const totalTasks = projectDetails.tasks.length;
  const completedTasksPercentage =
    totalTasks > 0
      ? Math.round((totalCompletedTasks / projectDetails.tasks.length) * 100)
      : 0;
  const progressBarWidth = `${completedTasksPercentage}%`;

  const projectDaysLeft = Math.ceil(
    (new Date(projectDetails.dueDate).getTime() -
      new Date(projectDetails.startDate).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  const isOverdue = projectDaysLeft < 0;
  const daysLeftText = isOverdue ? "Overdue" : `${projectDaysLeft} days left`;

  return (
    <Card>
      <div className="flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <p className="text-xl font-bold">{projectDetails.name}</p>
          <div className="flex justify-between items-center p-2 hover:bg-gray-100 hover:bg-opacity-20 rounded-lg cursor-pointer">
            <MdOutlineMoreHoriz size={24} />
          </div>
        </div>
        {projectDetails.description && (
          <div className="w-full">
            <p className="text-sm">{projectDetails.description}</p>
          </div>
        )}
        <div className="w-full flex justify-between items-center my-2">
          <div
            className={`py-2 px-5 ${projectStatusBgColor} border ${projectStatusBorderColor} rounded-full`}
          >
            <p className={`text-xs ${projectStatusColor} font-bold`}>
              {projectStatusLabel}
            </p>
          </div>
          <div
            className={`py-2 px-5 ${projectPriorityBgColor} border ${projectPriorityBorderColor} rounded-full`}
          >
            <p className={`text-xs ${projectPriorityColor} font-bold`}>
              {projectPriorityLabel}
            </p>
          </div>
        </div>
        <div className="w-full flex justify-between items-center my-1">
          <p className="text-sm">Progress</p>
          <p className="text-sm font-bold">
            {!completedTasksPercentage ? 0 : `${completedTasksPercentage}%`}
          </p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="h-2.5 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 rounded-full transition-all duration-300"
            style={{ width: progressBarWidth }}
          ></div>
        </div>
        <div className="w-full flex justify-between items-center mt-5 mb-2">
          <div className="flex items-center gap-2 h-5">
            <MdCalendarToday className="text-gray-500" />
            <span className="text-sm text-gray-700">
              Start Date:{" "}
              {new Date(projectDetails.startDate).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center h-5">
            <span className="text-sm text-gray-700">
              {totalCompletedTasks} of {totalTasks} tasks completed
            </span>
          </div>
        </div>
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center gap-2 h-5">
            <MdCalendarToday className="text-gray-500" />
            <span className="text-sm text-gray-700">
              Due Date: {new Date(projectDetails.dueDate).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center h-5">
            <span
              className={`text-sm ${
                isOverdue ? "text-red-600" : "text-gray-700"
              }`}
            >
              {daysLeftText}
            </span>
          </div>
        </div>
        <div className="w-full">
          <hr className="my-4 border-gray-300" />
        </div>
        <div className="w-full flex justify-end">
          <button className="px-4 py-2 text-blue-600 rounded-lg hover:bg-gray-200 transition-colors duration-300 cursor-pointer">
            View Details
          </button>
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
