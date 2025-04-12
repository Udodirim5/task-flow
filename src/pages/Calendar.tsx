
// Sample data - you'll replace this with your actual tasks data
const tasksByDate = {
  '2023-11-15': [
    { id: 1, title: 'Team meeting', time: '10:00 AM', completed: false },
    { id: 2, title: 'Review PRs', time: '2:00 PM', completed: false },
  ],
  '2023-11-20': [
    { id: 3, title: 'Ship new feature', time: '11:00 AM', completed: false },
  ],
  '2025-04-13': [
    { id: 4, title: 'Weekly planning', time: '9:00 AM', completed: true },
    { id: 5, title: 'Client call', time: '3:30 PM', completed: false },
  ],
};
// Current month/year - you'll manage this with state
const currentDate = new Date();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();

// Days in month calculation
const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

const Calendar = () => {


  // Generate calendar days
  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null); // Empty days before the 1st of the month
  }
  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
    days.push({
      day: i,
      dateStr,
      hasTasks: tasksByDate[dateStr] !== undefined,
      isToday: i === currentDate.getDate() && currentMonth === currentDate.getMonth(),
    });
  }

  // Selected day state - you'll implement this
  const selectedDay = null;

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md p-4 md:p-6">
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          {new Date(currentYear, currentMonth).toLocaleDateString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <div className="flex space-x-2">
          <button className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600" aria-label="go previous month button" >
            <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600" aria-label="go next month button">
            <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((dayData, index) => {
          if (!dayData) {
            return <div key={`empty-${index}`} className="h-12"></div>;
          }

          return (
            <button
              key={dayData.dateStr}
              className={`relative h-12 md:h-16 flex items-center justify-center rounded-lg transition-all
                ${dayData.isToday ? 'border-2 border-indigo-500' : ''}
                ${dayData.hasTasks ? 'bg-indigo-100 dark:bg-indigo-900 hover:bg-indigo-200 dark:hover:bg-indigo-800' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}
                ${selectedDay === dayData.dateStr ? 'ring-2 ring-indigo-500' : ''}
              `}
              onClick={() => {
                // You'll implement the click handler to set selectedDay
                if (dayData.hasTasks) {
                  console.log('Day clicked:', dayData.dateStr);
                }
              }}
            >
              <span className={`font-medium ${dayData.isToday ? 'text-indigo-600 dark:text-indigo-300' : 'text-gray-800 dark:text-gray-200'}`}>
                {dayData.day}
              </span>
              {dayData.hasTasks && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-indigo-500"></span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tasks Accordion */}
      {selectedDay && tasksByDate[selectedDay] && (
        <div className="mt-6 bg-white dark:bg-gray-700 rounded-lg shadow-sm p-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
            Tasks for {new Date(selectedDay).toLocaleDateString('default', { weekday: 'long', month: 'long', day: 'numeric' })}
          </h3>
          <div className="space-y-2">
            {tasksByDate[selectedDay].map((task) => (
              <div key={task.id} className="flex items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-600">
                <input
                  type="checkbox"
                  placeholder="Task name"
                  checked={task.completed}
                  onChange={() => console.log('Toggle task', task.id)}
                  className="h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
                />
                <div className="ml-3 flex-1">
                  <p className={`text-sm font-medium ${task.completed ? 'line-through text-gray-400' : 'text-gray-700 dark:text-gray-200'}`}>
                    {task.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{task.time}</p>
                </div>
                <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" aria-label=" button">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
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