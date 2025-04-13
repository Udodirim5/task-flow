import { useDispatch } from "react-redux";
import { Task } from "../type/types";
import { addTask, updateTask } from "../features/task/tasksSlice";
import { useState } from "react";

type TaskFormProps = {
  task?: Task | null;
  onCloseModal?: () => void;
};

type CategoryProps = {
  id: number;
  name: string;
  value: string;
};

const categories: CategoryProps[] = [
  { id: 1, name: "Work", value: "work" },
  { id: 2, name: "Team", value: "team" },
  { id: 3, name: "Documentation", value: "documentation" },
];

const TaskForm = ({ task = null, onCloseModal }: TaskFormProps) => {
  const [errors, setErrors] = useState<{ dueDate?: string }>({});

  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const dueDateStr = formData.get("dueDate")?.toString();
    const dueDate = dueDateStr ? new Date(dueDateStr) : null;
    const now = new Date();

    if (!dueDate) {
      setErrors({ dueDate: "Due date is required" });
      return;
    }

    if (dueDate <= now) {
      setErrors({ dueDate: "Due date must be in the future" });
      return;
    }
    // Clear errors & continue with submission logic
    setErrors({});

    const newTask: Task = {
      id: task?.id ?? Date.now(),
      title: formData.get("title") as string,
      description: (formData.get("description") as string) || "",
      dueDate: (formData.get("dueDate") as string) || "",
      priority: formData.get("priority") as "High" | "Medium" | "Low",
      status: "Pending",
      category: formData.get("category") as string,
      tags:
        (formData.get("tags") as string)
          ?.split(",")
          .map((tag) => tag.trim())
          .filter(Boolean) || [],
      createdAt: new Date().toISOString(),
    };

    if (task) {
      dispatch(updateTask(newTask));
    } else {
      dispatch(addTask(newTask));
    }

    if (onCloseModal) onCloseModal();
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Form Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {task ? "Edit Task" : "Create New Task"}
          </h3>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Task Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Task Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={task?.title || ""}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter task title"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              defaultValue={task?.description || ""}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              placeholder="Task details..."
            />
          </div>

          {/* Two-column fields for medium+ screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Due Date */}
            <div>
              <label
                htmlFor="dueDate"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                defaultValue={task?.dueDate || ""}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white
      ${
        errors.dueDate
          ? "border-red-500 dark:border-red-500"
          : "border-gray-300 dark:border-gray-600"
      }`}
              />
              {errors.dueDate && (
                <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>
              )}
            </div>

            {/* Priority */}
            <div>
              <label
                htmlFor="priority"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                defaultValue={task?.priority || "Medium"}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          {/* Two-column fields for medium+ screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                defaultValue={task?.category || ""}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.value}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div>
              <label
                htmlFor="tags"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Tags
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                defaultValue={task?.tags?.join(", ") || ""}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                placeholder="Comma separated tags"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onCloseModal}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {task ? "Update Task" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default TaskForm;
