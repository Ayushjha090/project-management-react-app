import { type FC, useState } from "react";

// import ProjectHeader from "./components/header/ProjectHeader";
import Header from "./components/header";

import type { Project } from "./types/project";
import Projects from "./components/projects";

const App: FC = () => {
  const [projectSelected, setProjectSelected] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      name: "Sample Project",
      description: "This is a sample project description.",
      status: "in-progress",
      tasks: [
        {
          id: "1",
          title: "Sample Task",
          description: "This is a sample task description.",
          status: "in-progress",
          priority: "medium",
          createdAt: new Date(),
          updatedAt: new Date(),
          startDate: new Date(),
          dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          projectId: "1",
        },
        {
          id: "1",
          title: "Sample Task 2",
          description: "This is a sample task 2 description.",
          status: "done",
          priority: "medium",
          createdAt: new Date(),
          updatedAt: new Date(),
          startDate: new Date(),
          dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          projectId: "1",
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
      priority: "medium",
      startDate: new Date(),
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  ]);

  const handleCreateProject = (projectData: Project) => {
    const projectsLength = projects.length;
    projectData.id = (projectsLength + 1).toString();
    setProjects((prevProjects) => [...prevProjects, projectData]);
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects((prevProjects) => {
      const filteredProjects = prevProjects.filter(
        (project) => project.id !== projectId
      );

      return filteredProjects;
    });
  };

  const handleSelectProject = (projectId: string) => {
    const project = projects.find((project) => project.id === projectId);

    if (project) {
      setProjectSelected(project);
    }
  };

  const handleUpdateProject = (projectId: string, projectData: Project) => {
    const projectExist = projects.some((project) => project.id === projectId);
    if (!projectExist) {
      return;
    }

    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId ? { ...project, ...projectData } : project
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      {!projectSelected ? (
        <>
          <Header />
          <Projects
            projects={projects}
            onSelectProject={handleSelectProject}
            onCreateProject={handleCreateProject}
            onDeleteProject={handleDeleteProject}
            onUpdateProject={handleUpdateProject}
          />
        </>
      ) : (
        <h1>Project Selected</h1>
      )}
    </div>
  );
};

export default App;
