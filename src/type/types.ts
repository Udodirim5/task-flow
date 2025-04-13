export interface TaskResponse {
  tasks: Task[];
  message: string;
}

export type Task = {
  id: number;
  title: string;
  priority: "High" | "Medium" | "Low";
  status: "Pending" | "In-progress" | "Completed";
  dueDate: string;
  category: string;
  description: string;
  tags: string[];
  createdAt: string;
};

export type SelectOption = {
  value: string;
  label: string;
}