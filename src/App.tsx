import { Route, Routes } from "react-router-dom";
import AppLayer from "./ui/AppLayer";
import Calendar from "./pages/Calendar";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import TaskSingle from "./pages/TaskSingle";

const App = () => {
  return (
    <Routes>
      <Route element={<AppLayer />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/task/:id" element={<TaskSingle />} />
      </Route>
    </Routes>
  );
};

export default App;
