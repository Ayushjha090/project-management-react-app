import { type FC } from "react";
import type { IconType } from "react-icons";

import { MdFolderOpen } from "react-icons/md";
import { MdMoving } from "react-icons/md";
import { MdCheckCircleOutline } from "react-icons/md";
import { MdAddchart } from "react-icons/md";

import Icon from "../shared/Icon";

interface HeroProps {
  totalProjects: number;
  totalTasks: number;
  totalActiveProjects: number;
  totalCompletedProjects: number;
}

interface CardProps {
  title: string;
  value: number;
  icon: IconType;
  color: string;
  percentage: number;
}

const colorMap = {
  blue: {
    border: "border-blue-800",
    bg: "bg-blue-100",
    iconBg: "bg-blue-600",
    textValue: "text-blue-900",
    textTitle: "text-blue-600",
    progressBg: "bg-blue-200",
    progressDark: "dark:bg-blue-700",
    progressBar: "bg-blue-600",
  },
  red: {
    border: "border-red-800",
    bg: "bg-red-100",
    iconBg: "bg-red-600",
    textValue: "text-red-900",
    textTitle: "text-red-600",
    progressBg: "bg-red-200",
    progressDark: "dark:bg-red-700",
    progressBar: "bg-red-600",
  },
  green: {
    border: "border-green-800",
    bg: "bg-green-100",
    iconBg: "bg-green-600",
    textValue: "text-green-900",
    textTitle: "text-green-600",
    progressBg: "bg-green-200",
    progressDark: "dark:bg-green-700",
    progressBar: "bg-green-600",
  },
  purple: {
    border: "border-purple-800",
    bg: "bg-purple-100",
    iconBg: "bg-purple-600",
    textValue: "text-purple-900",
    textTitle: "text-purple-600",
    progressBg: "bg-purple-200",
    progressDark: "dark:bg-purple-700",
    progressBar: "bg-purple-600",
  },
};

const Card: FC<CardProps> = ({ title, value, icon, color, percentage }) => {
  const c = colorMap[color as keyof typeof colorMap];

  return (
    <div
      className={`group flex flex-col w-full lg:w-xs justify-center ${c.border} ${c.bg} p-8 shadow-lg rounded-lg cursor-pointer my-2 transition-all duration-400 hover:shadow-xl hover:-translate-y-2`}
    >
      <div className="flex flex-row justify-start">
        <Icon
          icon={icon}
          iconClassName="text-white text-4xl"
          backgroundClassName={`${c.iconBg} h-16 w-16 p-2 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
        />
        <div className="flex flex-col ml-3">
          <p className={`text-3xl ${c.textValue} font-bold`}>{value}</p>
          <p className={`text-xl ${c.textTitle}`}>{title}</p>
        </div>
      </div>
      <div
        className={`w-full ${c.progressBg} rounded-full h-2.5 dark:${c.progressDark} mt-3`}
      >
        <div
          className={`${c.progressBar} h-2.5 rounded-full transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

const Hero: FC<HeroProps> = ({
  totalProjects,
  totalTasks,
  totalActiveProjects,
  totalCompletedProjects,
}) => {
  const completedPercentage =
    totalProjects > 0
      ? Math.round((totalCompletedProjects / totalProjects) * 100)
      : 0;

  const cards: {
    title: string;
    value: number;
    icon: IconType;
    color: string;
    percentage: number;
  }[] = [
    {
      title: "Total Projects",
      value: totalProjects,
      icon: MdFolderOpen,
      color: "blue",
      percentage: totalProjects > 0 ? 100 : 0,
    },
    {
      title: "Active Projects",
      value: totalActiveProjects,
      icon: MdMoving,
      color: "red",
      percentage:
        totalProjects > 0
          ? Math.round((totalActiveProjects / totalProjects) * 100)
          : 0,
    },
    {
      title: "Completed Projects",
      value: totalCompletedProjects,
      icon: MdCheckCircleOutline,
      color: "green",
      percentage: completedPercentage,
    },
    {
      title: "Total Tasks",
      value: totalTasks,
      icon: MdAddchart,
      color: "purple",
      percentage: totalTasks > 0 ? 100 : 0,
    },
  ];

  return (
    <div className="flex flex-col items-start justify-center w-full">
      <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
        Welcome to Project Hub!
      </h1>
      <p className="text-sm md:text-xl text-gray-600 leading-relaxed mb-8">
        Organize, track, and manage your projects with style. Your personal
        workspace for productivity
      </p>
      <div className="w-full flex flex-wrap justify-between items-center">
        {cards.map((card) => (
          <Card key={card.title} {...card} />
        ))}
      </div>
    </div>
  );
};

export default Hero;
