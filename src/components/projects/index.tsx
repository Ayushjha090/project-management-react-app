import { type FC, useState } from "react";

import { MdAdd } from "react-icons/md";

import Hero from "./Hero";
import CategoryDropdown from "../shared/Search";
import Button from "../shared/Button";
import { PROJECT_STATUS_MAP } from "../../utils/constants";
import type { Project } from "../../types/project";
import ProjectListing from "./Listing";

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
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All categories");

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

  const handleSearch = (searchItem: string) => {
    if (searchItem.trim() === "") {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter((project) =>
        project.name.toLowerCase().includes(searchItem.toLowerCase())
      );
      setFilteredProjects(filtered);
    }
  };

  const handleSelectCategory = (category: string) => {
    if (category === "All categories") {
      setFilteredProjects(projects);
      setSelectedCategory("All categories");
    } else {
      const filtered = projects.filter(
        (project) => project.status === category
      );
      setFilteredProjects(filtered);
      setSelectedCategory(
        PROJECT_STATUS_MAP[category as keyof typeof PROJECT_STATUS_MAP] ||
          category
      );
    }
  };

  return (
    <>
      <div className="w-xs md:w-3/4 flex mx-auto my-2 p-5 justify-center">
        <Hero
          totalActiveProjects={totalActiveProjects}
          totalProjects={totalProjects}
          totalTasks={totalTasks}
          totalCompletedProjects={totalCompletedProjects}
        />
      </div>
      <div className="w-xs md:w-3/4 flex flex-wrap mx-auto justify-between items-center px-5 py-2">
        <div className="w-full md:w-1/2 my-2">
          <CategoryDropdown
            statusMap={PROJECT_STATUS_MAP}
            selectedCategory={selectedCategory}
            onSearch={handleSearch}
            onSelectCategory={handleSelectCategory}
          />
        </div>
        <div className="w-full md:w-1/2 flex justify-end my-2">
          <Button>
            <MdAdd className="text-2xl inline-block group-hover:rotate-90 transition-all duration-300" />{" "}
            New Project
          </Button>
        </div>
      </div>
      <div className="w-xs md:w-3/4 flex flex-wrap mx-auto justify-between items-center px-5 py-2">
        <ProjectListing
          projects={projects}
          fileteredProjects={filteredProjects}
          onSelectProject={onSelectProject}
          onClickCreateProject={() => onCreateProject({} as Project)}
        />
      </div>
    </>
  );
};

export default Projects;
