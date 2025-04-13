import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { Task } from "../type/types";
import { markAsComplete } from "../features/task/tasksSlice";
import { ChevronLeft, ChevronRight, Trash2Icon } from "lucide-react";

type TaskPreview = {
  id: number;
  title: string;
  time: string;
  completed: boolean;
  processing?: boolean;
};

const Calendar = () => {
  const tasks: Task[] = useSelector((state: RootState) => state.tasks.items);
  const dispatch = useDispatch<AppDispatch>();

  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth()
  );
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const today = new Date();

  const tasksByDate = tasks.reduce<Record<string, TaskPreview[]>>(
    (acc, task) => {
      const date = task.createdAt;
      const formattedTask: TaskPreview = {
        id: task.id,
        title: task.title,
        time: "10:00 AM", // Adjust this if your task has a specific time
        completed: task.status === "Completed",
        processing: task.status === "In-progress",
      };

      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(formattedTask);
      return acc;
    },
    {}
  );

  type CalendarDay = {
    day: number;
    dateStr: string;
    hasTasks: boolean;
    isToday: boolean;
  } | null;
  const days: CalendarDay[] = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null); // Safe, no any needed
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(
      2,
      "0"
    )}-${String(i).padStart(2, "0")}`;
    const isToday =
      i === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear();

    days.push({
      day: i,
      dateStr,
      hasTasks: !!tasksByDate[dateStr],
      isToday,
    });
  }

  const goToPreviousMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 0) {
        setCurrentYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
    setSelectedDay(null);
  };

  const goToNextMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 11) {
        setCurrentYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
    setSelectedDay(null);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md p-4 md:p-6">
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          {new Date(currentYear, currentMonth).toLocaleDateString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <div className="flex space-x-2">
          <button
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            onClick={goToPreviousMonth}
            aria-label="Previous month"
          >
              <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
          <button
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            onClick={goToNextMonth}
            aria-label="Next month"
          >
            <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
        </div>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((dayData, index) => {
          if (!dayData) {
            return <div key={`empty-${index}`} className="h-12"></div>;
          }

          return (
            <button
              key={dayData.dateStr}
              className={`relative h-12 md:h-16 flex items-center justify-center rounded-lg transition-all
                ${dayData.isToday ? "border-2 border-indigo-500" : ""}
                ${
                  dayData.hasTasks
                    ? "bg-indigo-100 dark:bg-indigo-900 hover:bg-indigo-200 dark:hover:bg-indigo-800"
                    : "hover:bg-gray-200 dark:hover:bg-gray-700"
                }
                ${
                  selectedDay === dayData.dateStr
                    ? "ring-2 ring-indigo-500"
                    : ""
                }
              `}
              onClick={() => {
                setSelectedDay(dayData.dateStr);
              }}
            >
              <span
                className={`font-medium ${
                  dayData.isToday
                    ? "text-indigo-600 dark:text-indigo-300"
                    : "text-gray-800 dark:text-gray-200"
                }`}
              >
                {dayData.day}
              </span>
              {dayData.hasTasks && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-indigo-500" />
              )}
            </button>
          );
        })}
      </div>

      {/* Tasks for selected day */}
      {selectedDay && tasksByDate[selectedDay] && (
        <div className="mt-6 bg-white dark:bg-gray-700 rounded-lg shadow-sm p-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
            Tasks for{" "}
            {new Date(selectedDay).toLocaleDateString("default", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </h3>
          <div className="space-y-2">
            {tasksByDate[selectedDay].map((task) => (
              <div
                key={task.id}
                className="flex items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-600"
              >
                {task.processing && (
                  <input
                    type="checkbox"
                    checked={task.completed}
                    placeholder="checkbox"
                    onChange={() => dispatch(markAsComplete(task.id))}
                    className="h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
                  />
                )}
                <div className="ml-3 flex-1">
                  <p
                    className={`text-sm font-medium ${
                      task.completed
                        ? "line-through text-gray-400"
                        : "text-gray-700 dark:text-gray-200"
                    }`}
                  >
                    {task.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {task.time}
                  </p>
                </div>
                <button
                  onClick={() => console.log("Delete task", task.id)}
                  className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  aria-label="delete task"
                >
                  <Trash2Icon className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
