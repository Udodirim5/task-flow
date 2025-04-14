import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { RootState } from "../store";
import { Task } from "../type/types";
import { Calendar, Clipboard, FolderOpen, Search } from "lucide-react";
import TaskFilterOperation from "../features/task/TaskFilterOperation";
import useIsMobile from "../hooks/useIsMobile";

const HomePage = () => {
  const tasks = useSelector((state: RootState) => state.tasks.items);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [sortOption, setSortOption] = useState("Due Date");
  const isMobile = useIsMobile();

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || task.status === statusFilter;
    const matchesPriority =
      priorityFilter === "All" || task.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortOption === "Due Date") {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    } else if (sortOption === "Priority") {
      const priorityOrder: Record<Task["priority"], number> = {
        High: 1,
        Medium: 2,
        Low: 3,
      };
      return (
        priorityOrder[a.priority as keyof typeof priorityOrder] -
        priorityOrder[b.priority as keyof typeof priorityOrder]
      );
    } else if (sortOption === "Title") {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
          My Tasks
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          {filteredTasks.length} {filteredTasks.length === 1 ? "task" : "tasks"}{" "}
          shown
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div
        className={`mb-6 flex justify-between gap-2 ${!isMobile ? "pr-4" : ""}`}
      >
        {/* Search Box */}
        <div className="w-80">
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="search"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`block pl-10 pr-3 py-2 border dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 
                ${!isMobile ? "w-[360px]" : "w-full"}`}
            />
          </div>
        </div>
        <TaskFilterOperation
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
          sortOption={sortOption}
          setSortOption={setSortOption}
        />
      </div>

      {/* Task Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {sortedTasks.map((task) => (
          <Link
            to={`task/${task.id}`}
            key={task.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer"
          >
            {/* Task Card Content - same as before */}
            <div
              className={`px-4 py-3 border-b ${
                task.priority === "High"
                  ? "bg-red-50 dark:bg-red-900/30 border-red-100 dark:border-red-900"
                  : task.priority === "Medium"
                  ? "bg-yellow-50 dark:bg-yellow-900/30 border-yellow-100 dark:border-yellow-900"
                  : "bg-green-50 dark:bg-green-900/30 border-green-100 dark:border-green-900"
              }`}
            >
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-gray-800 dark:text-white line-clamp-2">
                  {task.title}
                </h3>
                <span
                  className={`ml-2 px-2 py-1 text-xs rounded-lg ${
                    task.priority === "High"
                      ? "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200"
                      : task.priority === "Medium"
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200"
                      : "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200"
                  }`}
                >
                  {task.priority}
                </span>
              </div>
            </div>

            <div className="p-4">
              <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">
                {task.description}
              </p>

              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 mr-2">
                    Status:
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded-lg ${
                      task.status === "Completed"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200"
                        : task.status === "In-progress"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                    }`}
                  >
                    {task.status}
                  </span>
                </div>

                <div className="flex items-center">
                  <Calendar className="w-4 h-4 text-gray-400 dark:text-gray-500 mr-1.5" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    Due:{" "}
                    {new Date(task.dueDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>

                <div className="flex items-center">
                  <FolderOpen className="w-4 h-4 text-gray-400 dark:text-gray-500 mr-1.5" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {task.category}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {sortedTasks.length === 0 && (
        <div className="text-center py-12">
          <Clipboard className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
            No tasks found
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Try adjusting your search or filters
          </p>
          <div className="mt-6">
            <button
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("All");
                setPriorityFilter("All");
              }}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Clear filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
