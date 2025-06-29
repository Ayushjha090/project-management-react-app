import { type FC, useEffect, useState } from "react";

import {
  MdAutoAwesome,
  MdDescription,
  MdStars,
  MdCalendarToday,
} from "react-icons/md";

import Button from "../shared/Button";
import Error from "../shared/Error";
import { TASK_STATUS_MAP } from "../../utils/constants";
import type { Task } from "../../types/task";
import type { Project } from "../../types/project";

interface TaskFormProps {
  task?: Task | null;
  projectDetails: Project;
  onSubmit: (data: Task) => void;
  onCancel: () => void;
}

const TaskForm: FC<TaskFormProps> = ({
  task,
  projectDetails,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Task>({
    id: task?.id || "",
    title: task?.title || "",
    description: task?.description || "",
    projectId: task?.projectId || projectDetails.id,
    status: task?.status || "to-do",
    priority: task?.priority || "medium",
    startDate: task?.startDate || new Date(),
    dueDate: task?.dueDate || new Date(),
    createdAt: task?.createdAt || new Date(),
    updatedAt: task?.updatedAt || new Date(),
  });

  useEffect(() => {
    setFormData({
      id: task?.id || "",
      title: task?.title || "",
      description: task?.description || "",
      projectId: task?.projectId || projectDetails.id,
      status: task?.status || "to-do",
      priority: task?.priority || "medium",
      startDate: task?.startDate || new Date(),
      dueDate: task?.dueDate || new Date(),
      createdAt: task?.createdAt || new Date(),
      updatedAt: task?.updatedAt || new Date(),
    });
  }, [task, projectDetails]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (data: Task): boolean => {
    const newErrors: Record<string, string> = {};
    if (!data.title.trim()) {
      newErrors.title = "Task title is required";
    } else if (data.title.length < 3) {
      newErrors.title = "Task title must be at least 3 characters long";
    } else if (data.title.length > 64) {
      newErrors.title = "Task title must be less than 64 characters";
    }
    if (data.description && !data.description.trim().length) {
      newErrors.description = "Task description cannot be empty";
    } else if (data.description && data.description.length < 3) {
      newErrors.description =
        "Task description must be at least 3 characters long";
    } else if (data.description && data.description.length > 256) {
      newErrors.description =
        "Task description must be less than 256 characters";
    }
    if (!data.status) {
      newErrors.status = "Task status is required";
    }
    if (!data.priority) {
      newErrors.priority = "Task priority is required";
    }
    if (data.startDate && data.dueDate) {
      const startDate = new Date(data.startDate);
      const dueDate = new Date(data.dueDate);
      if (startDate > dueDate) {
        newErrors.dates = "Start date cannot be after due date";
      }
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }
    return true;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (
      name.toLowerCase() === "startdate" ||
      name.toLowerCase() === "duedate"
    ) {
      setFormData((prev) => ({ ...prev, [name]: new Date(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm(formData)) {
      return;
    }
    const updatedTask: Task = {
      ...formData,
      updatedAt: new Date(),
    };
    onSubmit(updatedTask);
    setFormData({
      id: "",
      title: "",
      description: "",
      projectId: "",
      status: "to-do",
      priority: "medium",
      startDate: new Date(),
      dueDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    onCancel();
  };

  return (
    <div className="relative">
      <div className="absolute -top-10 -right-10 w-fit h-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-2xl"></div>
      <div className="absolute -bottom-10 -left-10 w-full h-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-2xl"></div>
      <form onSubmit={handleSubmit} className="relative space-y-8">
        <div className="m-2">
          <label
            htmlFor="title"
            className="w-fit flex items-center gap-3 text-lg font-bold text-gray-700 mb-3"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <MdAutoAwesome className="w-4 h-4 text-white" />
            </div>
            Task Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 text-lg font-medium"
            placeholder="Enter a task title..."
          />
          {errors.title ? (
            <Error message={errors.title} className="ml-2" />
          ) : null}
        </div>
        <div className="mx-2 mt-5 mb-0">
          <label
            htmlFor="description"
            className="w-fit flex items-center gap-3 text-lg font-bold text-gray-700 mb-3"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <MdDescription className="w-4 h-4 text-white" />
            </div>
            Task Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 resize-none text-base"
            placeholder="Describe the task..."
          />
          {errors.description ? (
            <Error message={errors.description} className="ml-2" />
          ) : null}
        </div>
        <div className="mx-2 mt-3 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="status"
              className="w-fit flex items-center gap-3 text-lg font-bold text-gray-700 mb-3"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                <MdStars className="w-4 h-4 text-white" />
              </div>
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 pr-8 py-2 bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 text-base font-medium"
            >
              {Object.entries(TASK_STATUS_MAP).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            {errors.status ? (
              <Error message={errors.status} className="ml-2" />
            ) : null}
          </div>
          <div>
            <label
              htmlFor="priority"
              className="w-fit flex items-center gap-3 text-lg font-bold text-gray-700 mb-3"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                <MdStars className="w-4 h-4 text-white" />
              </div>
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 text-base font-medium"
            >
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            {errors.priority ? (
              <Error message={errors.priority} className="ml-2" />
            ) : null}
          </div>
        </div>
        <div className="mx-2 mt-3 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="startDate"
              className="w-fit flex items-center gap-3 text-sm font-bold text-gray-700 mb-3"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center">
                <MdCalendarToday className="w-4 h-4 text-white" />
              </div>
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={
                formData.startDate
                  ? new Date(formData.startDate).toISOString().split("T")[0]
                  : ""
              }
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 text-base font-medium"
            />
            {errors.startDate ? (
              <Error message={errors.startDate} className="ml-2" />
            ) : null}
          </div>
          <div>
            <label
              htmlFor="dueDate"
              className="w-fit flex items-center gap-3 text-sm font-bold text-gray-700 mb-3"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center">
                <MdCalendarToday className="w-4 h-4 text-white" />
              </div>
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={
                formData.dueDate
                  ? new Date(formData.dueDate).toISOString().split("T")[0]
                  : ""
              }
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 text-base font-medium"
            />
            {errors.dueDate ? (
              <Error message={errors.dueDate} className="ml-2" />
            ) : null}
          </div>
        </div>
        <div className="w-full flex justify-between items-center m-2">
          <button
            type="button"
            className="w-full md:w-auto h-12 px-6 text-lg font-medium bg-gray-300 hover:bg-gray-400 rounded-lg cursor-pointer"
            onClick={onCancel}
          >
            Cancel
          </button>
          <Button type="submit" className="mr-4">
            {task ? "Update" : "Create"} Task
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
