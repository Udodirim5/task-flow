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
    deleteTask: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((task) => task.id !== action.payload);
    },
  },
});

export const { setTasks, addTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
