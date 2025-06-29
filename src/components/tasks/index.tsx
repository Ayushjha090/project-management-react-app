import { type FC, useState, useEffect, useRef } from "react";

import { MdAdd } from "react-icons/md";

import Hero from "./Hero";
import CategoryDropdown from "../shared/Search";
import Button from "../shared/Button";
import TaskListing from "./Listing";
import Modal from "../shared/Modal";
import { TASK_STATUS_MAP } from "../../utils/constants";
import type { Task } from "../../types/task";
import type { Project } from "../../types/project";
import type { ModalRef } from "../../types/modal";
import TaskForm from "./TaskForm";

interface TasksProps {
  projectDetails: Project;
  onCreateTask: (data: Task) => void;
  onUpdateTask: (projectId: string, taskId: string, data: Task) => void;
  onDeleteTask: (projectId: string, taskId: string) => void;
  onClickBack: () => void;
}

const Tasks: FC<TasksProps> = ({
  projectDetails,
  onCreateTask,
  onUpdateTask,
  onDeleteTask,
  onClickBack,
}) => {
  const modalRef = useRef<ModalRef>(null);
  const updateModalRef = useRef<ModalRef>(null);

  const [filteredTasks, setFilteredTasks] = useState<Task[]>(
    projectDetails.tasks || []
  );
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All categories");
  const [updatingTask, setUpdatingTask] = useState<Task | null>(null);

  useEffect(() => {
    setFilteredTasks(projectDetails.tasks || []);
  }, [projectDetails]);

  const handleSearch = (searchItem: string) => {
    if (searchItem.trim() === "") {
      setFilteredTasks(projectDetails.tasks || []);
    } else {
      const filtered = projectDetails.tasks.filter((task) =>
        task.title.toLowerCase().includes(searchItem.toLowerCase())
      );
      setFilteredTasks(filtered);
    }
  };

  const handleSelectCategory = (category: string) => {
    if (category === "All categories") {
      setFilteredTasks(projectDetails.tasks || []);
      setSelectedCategory("All categories");
    } else {
      const filtered = projectDetails.tasks.filter(
        (task) => task.status === category
      );
      setFilteredTasks(filtered);
      setSelectedCategory(
        TASK_STATUS_MAP[category as keyof typeof TASK_STATUS_MAP] || category
      );
    }
  };

  const handleClickCreateTask = () => {
    if (modalRef.current) {
      modalRef.current.open();
    }
  };

  const handleCancel = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  const handleClickDeleteTask = (taskId: string) => {
    if (!taskId) {
      console.error("Task ID is required to delete a task.");
      return;
    }
    onDeleteTask(projectDetails.id, taskId);
  };

  const handleClickUpdateTask = (taskId: string) => {
    const selectedTask = projectDetails.tasks.find(
      (task) => task.id === taskId
    );
    if (selectedTask && updateModalRef.current) {
      setUpdatingTask(selectedTask);
      updateModalRef.current.open();
    }
  };

  const handleCancelUpdateTask = () => {
    if (updateModalRef.current) {
      updateModalRef.current.close();
    }
  };

  return (
    <>
      <div className="w-xs md:w-3/4 flex mx-auto my-2 justify-start">
        <Hero projectDetails={projectDetails} onClickBack={onClickBack} />
      </div>
      <div className="w-xs md:w-3/4 flex flex-wrap mx-auto justify-between items-center py-2">
        <div className="w-full md:w-1/2 my-2">
          <CategoryDropdown
            title="Tasks"
            statusMap={TASK_STATUS_MAP}
            selectedCategory={selectedCategory}
            onSearch={handleSearch}
            onSelectCategory={handleSelectCategory}
          />
        </div>
        <div className="w-full md:w-1/2 flex justify-end my-2">
          <Button onClick={handleClickCreateTask}>
            <MdAdd className="text-2xl inline-block group-hover:rotate-90 transition-all duration-300" />{" "}
            New Task
          </Button>
        </div>
      </div>
      <div className="w-xs md:w-3/4 flex flex-wrap mx-auto justify-between items-center">
        <TaskListing
          tasks={projectDetails.tasks || []}
          fileteredTasks={filteredTasks}
          onClickCreateTask={handleClickCreateTask}
          onDeleteTask={handleClickDeleteTask}
          onUpdateTask={handleClickUpdateTask}
        />
      </div>
      <Modal ref={modalRef} title="Create Task">
        <TaskForm
          projectDetails={projectDetails}
          onSubmit={onCreateTask}
          onCancel={handleCancel}
        />
      </Modal>

      <Modal ref={updateModalRef} title="Update Project">
        <TaskForm
          projectDetails={projectDetails}
          task={updatingTask}
          onSubmit={(projectData: Task) =>
            onUpdateTask(projectDetails.id, projectData.id, projectData)
          }
          onCancel={handleCancelUpdateTask}
        />
      </Modal>
    </>
  );
};

export default Tasks;
