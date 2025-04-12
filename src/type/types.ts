export interface TaskResponse {
  tasks: Task[];
  message: string;
}

export type Task = {
  id: number;
  title: string;
  priority: string;
  status: string;
  dueDate: string;
  category: string;
  description: string;
  tags: string[];
  createdAt: string;
};
