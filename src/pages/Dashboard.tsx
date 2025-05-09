import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import { deleteTask } from "../features/task/tasksSlice";
import {
  SquarePen,
  Trash2Icon,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clipboard,
} from "lucide-react";
import Modal from "../ui/Modal";
import TaskForm from "../ui/TaskForm";
import ConfirmDelete from "../ui/ConfirmDelete";
import SortBy from "../ui/SortBy";
import FilterSelect from "../ui/filter";
import { useSearchParams } from "react-router-dom";
import AddTaskBtn from "../features/task/AddTaskBtn";

// Sample tasks data - you'll replace with your actual data
const Dashboard = () => {
  const [searchParams] = useSearchParams();

  const tasks = useSelector((state: RootState) => state.tasks.items);
  const dispatch = useDispatch<AppDispatch>();

  const filterValue = searchParams.get("status") || "all";
  const sortBy = searchParams.get("sortBy") || "";

  // 1. Filter tasks by status
  // Clone first to avoid mutating the original
  let filteredTasks = [...tasks];

  if (filterValue !== "all") {
    filteredTasks = filteredTasks.filter(
      (task) => task.status.toLowerCase() === filterValue.toLowerCase()
    );
  }

  if (sortBy === "due-date") {
    filteredTasks = [...filteredTasks].sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    );
  }

  if (sortBy === "priority") {
    const priorityOrder: { [key: string]: number } = {
      High: 1,
      Medium: 2,
      Low: 3,
    };

    filteredTasks = [...filteredTasks].sort(
      (a, b) =>
        (priorityOrder[a.priority] ?? 99) - (priorityOrder[b.priority] ?? 99)
    );
  }

  if (sortBy === "title") {
    filteredTasks = [...filteredTasks].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  }

  return (
    <div className="p-4 md:p-6 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Task Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your tasks efficiently
        </p>
      </div>

      {/* Action Buttons Section */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Add Task Button */}

        <AddTaskBtn className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors shadow-sm" />

        {/* Filter Dropdown */}
        <div className="relative flex-1 sm:max-w-[200px]">
          <FilterSelect
            options={[
              { value: "all", label: "Filter by Status" },
              { value: "pending", label: "Filter by Pending]" },
              { value: "in-progress", label: "Filter by progress" },
              { value: "completed", label: "Filter by Completed" },
            ]}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Sort Dropdown */}
        <div className="relative flex-1 sm:max-w-[200px]">
          <SortBy
            options={[
              { value: "all", label: "Sort by" },
              { value: "due-date", label: "Sort by Due Date]" },
              { value: "priority", label: "Sort by Priority" },
              { value: "title", label: "Sort by Title" },
            ]}
          />

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Tasks Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        {/* Table - Responsive with horizontal scroll on small screens */}
        {filteredTasks.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredTasks.map((task) => (
                  <tr
                    key={task.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-white">
                      {task.title}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-lg ${
                          task.priority === "High"
                            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                            : task.priority === "Medium"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                            : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        }`}
                      >
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-lg ${
                          task.status === "Completed"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : task.status === "In-progress"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200"
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(task.dueDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {task.category}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Modal>
                          <Modal.Open opensWindowName="window1">
                            <button
                              className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                              aria-label="edit button"
                            >
                              <SquarePen />
                            </button>
                          </Modal.Open>

                          <Modal.Window name="window1">
                            <TaskForm task={task} />
                          </Modal.Window>
                        </Modal>

                        <Modal>
                          <Modal.Open opensWindowName="window1">
                            <button
                              className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                              aria-label="delete button"
                            >
                              <Trash2Icon />
                            </button>
                          </Modal.Open>

                          <Modal.Window name="window1">
                            <ConfirmDelete
                              resourceName={task.title}
                              onConfirm={() => dispatch(deleteTask(task.id))}
                            />
                          </Modal.Window>
                        </Modal>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {filteredTasks.length === 0 && (
          <div className="text-center py-22 ">
            <Clipboard className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
              No tasks found
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              You can add a new task by clicking the "+" button
            </p>
            <div className="mt-6 flex items-center justify-center">
              <AddTaskBtn className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors shadow-sm" />
            </div>
          </div>
        )}

        {/* Pagination */}
        {filteredTasks.length > 10 && (
          <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Showing <span className="font-medium">1</span> to{" "}
                  <span className="font-medium">{tasks.length}</span> of{" "}
                  <span className="font-medium">{tasks.length}</span> results
                </p>
              </div>
              <div>
                <nav
                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <a
                    href="#"
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeft className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    aria-current="page"
                    className="z-10 bg-indigo-50 dark:bg-indigo-900 border-indigo-500 text-indigo-600 dark:text-indigo-300 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  >
                    1
                  </a>
                  <a
                    href="#"
                    className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  >
                    2
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRight className="w-5 h-5" />
                  </a>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
