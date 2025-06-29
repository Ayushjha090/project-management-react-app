import { type FC } from "react";

import { MdAdd } from "react-icons/md";

import Button from "../shared/Button";
import TaskCard from "./TaskCard";
import type { Task } from "../../types/task";

interface TaskListingProps {
  tasks: Task[];
  fileteredTasks: Task[];
  onClickCreateTask: () => void;
  onDeleteTask: (taskId: string) => void;
  onUpdateTask: (taskId: string) => void;
}

const TaskListing: FC<TaskListingProps> = ({
  tasks,
  fileteredTasks,
  onClickCreateTask,
  onDeleteTask,
  onUpdateTask,
}) => {
  return (
    <div className="w-full">
      {!tasks?.length ? (
        <div className="w-full flex flex-col items-center justify-center py-20">
          <div className="max-w-md text-center">
            <div className="bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <MdAdd className="w-16 h-16 text-blue-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              No tasks yet
            </h3>
            <p className="text-gray-600 mb-10 text-lg leading-relaxed">
              Get started by adding your first task to this project.
            </p>
            <Button onClick={onClickCreateTask}>Add your first task</Button>
          </div>
        </div>
      ) : (
        <>
          {!fileteredTasks?.length ? (
            <div className="w-full flex flex-col items-center justify-center py-20">
              <div className="max-w-md text-center">
                <div className="bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-8 shadow-2xl">
                  <MdAdd className="w-16 h-16 text-blue-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  No tasks found
                </h3>
                <p className="text-gray-600 mb-10 text-lg leading-relaxed">
                  Try adjusting your search or filter criteria to find what
                  you're looking for
                </p>
              </div>
            </div>
          ) : (
            <div className="w-full flex gap-4 flex-wrap mt-4">
              {fileteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  taskDetails={task}
                  onDeleteTask={onDeleteTask}
                  onUpdateTask={onUpdateTask}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TaskListing;
