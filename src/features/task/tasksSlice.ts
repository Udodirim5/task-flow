import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../../type/types";
import { tasks } from "../../../data/data";

type TasksState = {
  items: Task[];
  loading: boolean;
};

const initialState: TasksState = {
  items: [...tasks],
  loading: false,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.items = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.items.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.items.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((task) => task.id !== action.payload);
    },
    startTask: (state, action: PayloadAction<number>) => {
      const task = state.items.find((t) => t.id === action.payload);
      if (task) {
        task.status = "In-progress";
      }
    },
    markAsComplete: (state, action: PayloadAction<number>) => {
      const task = state.items.find((t) => t.id === action.payload);
      if (task) {
        task.status = "Completed";
      }
    },
    stopTask: (state, action: PayloadAction<number>) => {
      const task = state.items.find((t) => t.id === action.payload);
      if (task) {
        task.status = "Pending";
      }
    },
  },
});

export const {
  setTasks,
  addTask,
  deleteTask,
  updateTask,
  startTask,
  markAsComplete,
  stopTask,
} = tasksSlice.actions;
export default tasksSlice.reducer;
