export interface Task {
  id: number;
  name: string;
  completed: boolean;
}

export interface Project {
  id: number;
  name: string;
  tasks: Task[];
}
