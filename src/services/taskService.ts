import axios from "axios";
import { Task, TaskResponse } from "../type/types";

const apiUrl = "https://jsonplaceholder.typicode.com/todos"; // Example API

export const getTasks = async (): Promise<Task[]> => {
  const response = await axios.get<TaskResponse>(apiUrl);
  return response.data.tasks;
};

export const createTask = async (task: Task): Promise<Task> => {
  const response = await axios.post<Task>(apiUrl, task);
  return response.data;
};

export const updateTask = async (
  taskId: number,
  completed: boolean
): Promise<Task> => {
  const response = await axios.patch<Task>(`${apiUrl}/${taskId}`, {
    completed,
  });
  return response.data;
};

export const deleteTask = async (taskId: number): Promise<void> => {
  await axios.delete(`${apiUrl}/${taskId}`);
};
