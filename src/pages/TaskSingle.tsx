import type { RootState } from "../store";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

// const TaskSingle = ({ task, onComplete, onEdit, onDelete, onBack }) => {
const TaskSingle = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>();
  const taskId = Number(id);
  
  const tasks = useSelector((state: RootState) => state.tasks.items);
  const task = tasks.find((t) => t.id === Number(taskId));

  console.log("TaskSingle component rendered");
  console.log("Task ID:", taskId);
  console.log("Task data:", task);
  console.log("Tasks:", tasks);

  if (!task)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 dark:text-gray-400">Task not found</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button and Header */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
          >
            <svg
              className="w-5 h-5 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to tasks
          </button>

          <div className="flex space-x-3">
            <button
              // onClick={onEdit}
              className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Edit
            </button>
            <button
              // onClick={onDelete}
              className="px-3 py-1 border border-red-200 dark:border-red-800 rounded-md text-sm font-medium text-red-700 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/30"
            >
              Delete
            </button>
          </div>
        </div>

        {/* Task Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Task Header with Priority */}
          <div
            className={`px-6 py-4 border-b ${
              task.priority === "High"
                ? "bg-red-50 dark:bg-red-900/30 border-red-100 dark:border-red-900"
                : task.priority === "Medium"
                ? "bg-yellow-50 dark:bg-yellow-900/30 border-yellow-100 dark:border-yellow-900"
                : "bg-green-50 dark:bg-green-900/30 border-green-100 dark:border-green-900"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mr-3">
                    {task.title}
                  </h2>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      task.priority === "High"
                        ? "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200"
                        : task.priority === "Medium"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200"
                        : "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200"
                    }`}
                  >
                    {task.priority} Priority
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Created: {new Date(task.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="mt-3 sm:mt-0">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    task.status === "Completed"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200"
                      : task.status === "In Progress"
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                  }`}
                >
                  {task.status}
                </span>
              </div>
            </div>
          </div>

          {/* Task Body */}
          <div className="p-6">
            {/* Description */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Description
              </h3>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {task.description || "No description provided"}
              </p>
            </div>

            {/* Task Meta Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Due Date */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Due Date
                </h3>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-gray-400 dark:text-gray-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">
                    {new Date(task.dueDate).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>

              {/* Category */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Category
                </h3>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-gray-400 dark:text-gray-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">
                    {task.category || "Uncategorized"}
                  </span>
                </div>
              </div>

              {/* Tags */}
              {task.tags && task.tags.length > 0 && (
                <div className="md:col-span-2">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {task.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Completion Button */}
            {task.status !== "Completed" && (
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  // onClick={onComplete}
                  className="w-full md:w-auto px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Mark as Completed
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Comments Section - Optional */}
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white">
              Comments
            </h3>
          </div>
          <div className="p-6">
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">
              Comments feature coming soon
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskSingle;
