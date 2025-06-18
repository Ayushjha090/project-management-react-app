import type { FC } from "react";

import type { Project } from "../../types/project";

interface ProjectsProps {
    projects: Project[];
    onSelectProject: (projectId: string) => void;
    onCreateProject: (data: Project) => void;
    onUpdateProject: (projectId: string, data: Project) => void;
    onDeleteProject: (projectId: string) => void;
}

const Projects: FC<ProjectsProps> = ({projects, onSelectProject, onCreateProject, onUpdateProject, onDeleteProject}) => {
    const totalProjects = projects.length;
    const totalTasks = projects.reduce((acc, project) => acc + (project.tasks ? project.tasks.length : 0), 0);
    const totalActiveProjects = projects.filter(project => project.status === "in-progress").length;
    const totalCompletedProjects = projects.filter(project => project.status === "completed").length;

    return (
        <div className="w-xs md:w-3/4 flex border mx-auto my-2 p-5 justify-center">
            <div className="p-5 w-sm rounded-2xl bg-white flex flex-row items-center justify-between shadow-2xl">
                <div className="flex flex-col justify-center items-center px-5">
                    <h2 className="text-2xl font-bold">{totalProjects}</h2>
                    <p className="text-sm text-gray-500">Projects</p>
                </div>
                <div className="h-3/4 border-l border-gray-300"></div>
                <div className="flex flex-col justify-center items-center px-5">
                    <h2 className="text-2xl font-bold text-blue-600">{totalActiveProjects}</h2>
                    <p className="text-sm text-gray-500">Active</p>
                </div>
                <div className="h-3/4 border-l border-gray-300"></div>
                <div className="flex flex-col justify-center items-center px-5">
                    <h2 className="text-2xl font-bold text-green-600">{totalCompletedProjects}%</h2>
                    <p className="text-sm text-gray-500">Complete</p>
                </div>
            </div>
        </div>
    )
};

export default Projects;