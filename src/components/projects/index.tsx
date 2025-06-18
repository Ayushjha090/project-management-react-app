import type { FC } from "react";

import Hero from "./Hero";
import type { Project } from "../../types/project";

interface ProjectsProps {
  projects: Project[];
  onSelectProject: (projectId: string) => void;
  onCreateProject: (data: Project) => void;
  onUpdateProject: (projectId: string, data: Project) => void;
  onDeleteProject: (projectId: string) => void;
}

const Projects: FC<ProjectsProps> = ({
  projects,
  onSelectProject,
  onCreateProject,
  onUpdateProject,
  onDeleteProject,
}) => {
  const totalProjects = projects.length;
  const totalTasks = projects.reduce(
    (acc, project) => acc + (project.tasks ? project.tasks.length : 0),
    0
  );
  const totalActiveProjects = projects.filter(
    (project) => project.status === "in-progress"
  ).length;
  const totalCompletedProjects = projects.filter(
    (project) => project.status === "completed"
  ).length;

  return (
    <div className="w-xs md:w-3/4 flex mx-auto my-2 p-5 justify-center">
      <Hero
        totalActiveProjects={totalActiveProjects}
        totalProjects={totalProjects}
        totalTasks={totalTasks}
        totalCompletedProjects={totalCompletedProjects}
      />
    </div>
  );
};

export default Projects;
