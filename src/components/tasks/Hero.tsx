import { type FC, createElement } from "react";

import {
  MdArrowBack,
  MdListAlt,
  MdCheckCircle,
  MdAutorenew,
  MdBlock,
} from "react-icons/md";

import type { IconType } from "react-icons";

import Chip from "../shared/Chip";
import {
  getPriorityUIConfig,
  getProjectStatusUIConfig,
} from "../../utils/helper";
import type { Project } from "../../types/project";

interface HeroSectionProps {
  projectDetails: Project;
  onClickBack: () => void;
}

const colorMap = {
  blue: {
    border: "border-blue-800",
    bg: "bg-blue-100",
    iconBg: "bg-blue-600",
    textValue: "text-blue-900",
    textTitle: "text-blue-600",
    progressBg: "bg-blue-200",
    progressBar: "bg-blue-600",
  },
  green: {
    border: "border-green-800",
    bg: "bg-green-100",
    iconBg: "bg-green-600",
    textValue: "text-green-900",
    textTitle: "text-green-600",
    progressBg: "bg-green-200",
    progressBar: "bg-green-600",
  },
  yellow: {
    border: "border-yellow-800",
    bg: "bg-yellow-100",
    iconBg: "bg-yellow-500",
    textValue: "text-yellow-900",
    textTitle: "text-yellow-600",
    progressBg: "bg-yellow-200",
    progressBar: "bg-yellow-500",
  },
  red: {
    border: "border-red-800",
    bg: "bg-red-100",
    iconBg: "bg-red-600",
    textValue: "text-red-900",
    textTitle: "text-red-600",
    progressBg: "bg-red-200",
    progressBar: "bg-red-600",
  },
};

interface CardProps {
  title: string;
  value: number;
  icon: IconType;
  color: keyof typeof colorMap;
  percentage: number;
}

const Card: FC<CardProps> = ({ title, value, icon, color, percentage }) => {
  const c = colorMap[color];
  return (
    <div
      className={`group flex flex-col w-full lg:w-xs justify-center ${c.border} ${c.bg} p-8 shadow-lg rounded-lg cursor-pointer my-2 transition-all duration-400 hover:shadow-xl hover:-translate-y-2`}
    >
      <div className="flex flex-row justify-start">
        <div
          className={`${c.iconBg} h-16 w-16 p-2 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
        >
          {icon && createElement(icon, { className: "text-white text-4xl" })}
        </div>
        <div className="flex flex-col ml-3">
          <p className={`text-3xl ${c.textValue} font-bold`}>{value}</p>
          <p className={`text-xl ${c.textTitle}`}>{title}</p>
        </div>
      </div>
      <div className={`w-full ${c.progressBg} rounded-full h-2.5 mt-3`}>
        <div
          className={`${c.progressBar} h-2.5 rounded-full transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

const Hero: FC<HeroSectionProps> = ({ projectDetails, onClickBack }) => {
  const totalTasks = projectDetails.tasks.length;
  const totalCompletedTasks = projectDetails.tasks.reduce((acc, task) => {
    if (task.status === "done") {
      return acc + 1;
    }
    return acc;
  }, 0);
  const projectProgress =
    totalTasks > 0 ? (totalCompletedTasks / totalTasks) * 100 : 0;

  const {
    projectStatusBgColor,
    projectStatusBorderColor,
    projectStatusColor,
    projectStatusLabel,
  } = getProjectStatusUIConfig(projectDetails);

  const { priorityBgColor, priorityBorderColor, priorityColor, priorityLabel } =
    getPriorityUIConfig(projectDetails);

  const completedTasks = projectDetails.tasks.filter(
    (t) => t.status === "done"
  ).length;
  const inProgressTasks = projectDetails.tasks.filter(
    (t) => t.status === "in-progress"
  ).length;
  const blockedTasks = projectDetails.tasks.filter(
    (t) => t.status === "blocked"
  ).length;

  const cards: CardProps[] = [
    {
      title: "Total Tasks",
      value: totalTasks,
      icon: MdListAlt,
      color: "blue",
      percentage: totalTasks > 0 ? 100 : 0,
    },
    {
      title: "Completed",
      value: completedTasks,
      icon: MdCheckCircle,
      color: "green",
      percentage:
        totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
    },
    {
      title: "In Progress",
      value: inProgressTasks,
      icon: MdAutorenew,
      color: "yellow",
      percentage:
        totalTasks > 0 ? Math.round((inProgressTasks / totalTasks) * 100) : 0,
    },
    {
      title: "Blocked",
      value: blockedTasks,
      icon: MdBlock,
      color: "red",
      percentage:
        totalTasks > 0 ? Math.round((blockedTasks / totalTasks) * 100) : 0,
    },
  ];

  return (
    <div className="flex flex-col w-full">
      <div>
        <button
          onClick={onClickBack}
          className="text-md flex items-center border-none p-2 my-5 bg-transparent text-gray-500 hover:bg-gray-300 rounded-xl cursor-pointer justify-self-start transition:all duration-100"
        >
          <MdArrowBack className="text-2xl mr-2" /> Back to Projects
        </button>
      </div>
      <div className="w-full rounded-xl bg-white shadow-xs p-5">
        <div className="flex justify-between flex-wrap mb-5">
          <div className="flex justify-start items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-semibold text-lg">
                {projectDetails.name.charAt(0)}
              </span>
            </div>
            <div className="flex flex-col justify-start">
              <h1 className="text-xl md:text-3xl font-bold">
                {projectDetails.name}
              </h1>
              {projectDetails?.description && (
                <p className="text-xs md:text-lg mt-1 text-gray-500">
                  {projectDetails.description}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-end items-start gap-2 mt-2 md:mt-0">
            <Chip
              bgColor={projectStatusBgColor}
              borderColor={projectStatusBorderColor}
              textColor={projectStatusColor}
              title={projectStatusLabel}
            />
            <Chip
              bgColor={priorityBgColor}
              borderColor={priorityBorderColor}
              textColor={priorityColor}
              title={priorityLabel}
            />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex justify-between mb-2">
            <p className="text-md">Project Progress</p>
            <p className="text-md">{projectProgress}%</p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="h-2.5 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 rounded-full transition-all duration-300"
              style={{ width: `${projectProgress}%` }}
            ></div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-wrap justify-between items-center mt-6">
        {cards.map((card) => (
          <Card key={card.title} {...card} />
        ))}
      </div>
    </div>
  );
};

export default Hero;
