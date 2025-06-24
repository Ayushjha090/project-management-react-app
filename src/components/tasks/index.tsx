import { type FC } from "react";

import Hero from "./Hero";
import type { Task } from "../../types/task";
import type { Project } from "../../types/project";

interface TasksProps {
  projectDetails: Project;
  tasks: Task[];
  onCreateTask: (data: Task) => void;
  onUpdateTask: (projectId: string, taskId: string, data: Task) => void;
  onDeleteTask: (projectId: string, taskId: string) => void;
  onClickBack: () => void;
}

const Tasks: FC<TasksProps> = ({
  projectDetails,
  tasks,
  onCreateTask,
  onUpdateTask,
  onDeleteTask,
  onClickBack,
}) => {
  return (
    <>
      <div className="w-xs md:w-3/4 flex mx-auto my-2 justify-start">
        <Hero projectDetails={projectDetails} onClickBack={onClickBack} />
      </div>
    </>
  );
};

export default Tasks;
