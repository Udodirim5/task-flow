import { ListFilterPlus } from "lucide-react";
import { useState } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import useIsMobile from "../../hooks/useIsMobile";

interface TaskFilterOperationProps {
  statusFilter: string;
  setStatusFilter: (statusFilter: string) => void;
  priorityFilter: string;
  setPriorityFilter: (priorityFilter: string) => void;
  sortOption: string;
  setSortOption: (sortOption: string) => void;
}
const TaskFilterOperation: React.FC<TaskFilterOperationProps> = ({
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
  sortOption,
  setSortOption,
}) => {
  const [openFilter, setOpenFilter] = useState(false);

  const ref = useOutsideClick<HTMLDivElement>(() => setOpenFilter(false));
  const isMobile = useIsMobile();

  return (
    <div
      className={`relative border dark:border-gray-600 rounded-md 
  ${!isMobile && "px-2 shadow-sm"}
  ${openFilter && !isMobile && "w-80"}
  `}
    >
      <button
        onClick={() => setOpenFilter((prev) => !prev)}
        className="flex items-center gap-1 w-full px-3 text-sm text-gray-100 hover:text-gray-300 transition duration-200 ease-in-out cursor-pointer "
      >
        <ListFilterPlus className="w-5 h-5 relative top-[10px]" />
        {!isMobile && <span className="relative top-[10px]">Filter</span>}
      </button>

      {openFilter && (
        <div
          ref={ref}
          className="absolute z-10 top-10 right-0 mt-2 w-80 p-4 bg-white dark:bg-gray-900 rounded-md shadow-lg space-y-4 border  dark:border-gray-600 rounded-md  shadow-sm "
        >
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="block w-full px-3 py-2 border  dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            aria-label="Status"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          {/* Priority Filter */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="block w-full px-3 py-2 border  dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            aria-label="Priority"
          >
            <option value="All">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          {/* Sort Option */}
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="block w-full px-3 py-2 border  dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            aria-label="Sort"
          >
            <option value="Due Date">Sort by Due Date</option>
            <option value="Priority">Sort by Priority</option>
            <option value="Title">Sort by Title</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default TaskFilterOperation;
