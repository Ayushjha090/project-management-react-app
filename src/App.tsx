import { type FC, useState } from "react";

import Header from "./components/header";
import Projects from "./components/projects";
import Tasks from "./components/tasks";
import type { Project } from "./types/project";
import type { Task } from "./types/task";

const App: FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

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
      setSelectedProject(project);
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

  const handleCreateTask = (data: Task) => {
    if (!data) return;

    const { projectId } = data;
    const project = projects.find((project) => project.id === projectId);
    if (!project) {
      console.error("Project not found");
      return;
    }
    setProjects((prevProjects) => {
      const newProjects = prevProjects.map((project) => {
        if (project.id === projectId) {
          data.id = project.tasks[project.tasks.length - 1]?.id + 1 || "1";
          return {
            ...project,
            tasks: [...project.tasks, data],
          };
        }
        return project;
      });
      const selectedProject = newProjects.find(
        (project) => project.id === projectId
      );
      if (selectedProject) {
        setSelectedProject(selectedProject);
      }
      return newProjects;
    });
  };

  const handleDeleteTask = (projectId: string, taskId: string) => {
    if (!projectId || !taskId) {
      return;
    }

    const project = projects.find((project) => project.id === projectId);
    if (!project) {
      console.error("Project not found");
      return;
    }
    const isTaskFound = project?.tasks.some((task) => task.id === taskId);
    if (!isTaskFound) {
      console.error("Task not found");
      return;
    }
    setProjects((prevProjects) => {
      const newProjects = prevProjects.map((project) => {
        if (project.id === projectId) {
          const filteredTasks = project.tasks.filter(
            (task) => task.id !== taskId
          );
          return {
            ...project,
            tasks: filteredTasks,
          };
        }
        return project;
      });
      const selectedProject = newProjects.find(
        (project) => project.id === projectId
      );
      if (selectedProject) {
        setSelectedProject(selectedProject);
      }
      return newProjects;
    });
  };

  const handleUpdateTask = (projectId: string, taskId: string, data: Task) => {
    if (!projectId || !taskId) {
      return;
    }
    const project = projects.find((project) => project.id === projectId);
    if (!project) {
      console.error("Project not found");
      return;
    }
    const isTaskFound = project?.tasks?.some((task) => task.id === taskId);
    if (!isTaskFound) {
      console.error("Task not found");
      return;
    }
    setProjects((prevProjects) => {
      const newProjects = prevProjects.map((project) => {
        if (project.id === projectId) {
          const updatedTasks = project.tasks.map((task) => {
            if (task.id === taskId) {
              return { ...data };
            }
            return task;
          });
          return { ...project, tasks: updatedTasks };
        }
        return project;
      });
      const selectedProject = newProjects.find(
        (project) => project.id === projectId
      );
      if (selectedProject) {
        setSelectedProject(selectedProject);
      }
      return newProjects;
    });
  };

  const handleClickBackToProjects = () => {
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      <Header />
      {!selectedProject ? (
        <>
          <Projects
            projects={projects}
            onSelectProject={handleSelectProject}
            onCreateProject={handleCreateProject}
            onDeleteProject={handleDeleteProject}
            onUpdateProject={handleUpdateProject}
          />
        </>
      ) : (
        <Tasks
          projectDetails={selectedProject}
          onCreateTask={handleCreateTask}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
          onClickBack={handleClickBackToProjects}
        />
      )}
    </div>
  );
};

export default App;
