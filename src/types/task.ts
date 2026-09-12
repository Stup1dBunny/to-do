export type TaskCategory =
  | 'Домашнее'
  | 'Работа'
  | 'Саморазвитие'
  | 'Развлечение'
  | 'Другое';

export type DeadlineFilter = 'all' | 'today' | 'week' | 'month';

export interface Task {
  id: string;
  taskName: string;
  taskTitle: string;
  taskDeadLine: string; 
  taskExecutor: string;
  taskCategory: TaskCategory;
  taskPreorety: string;
}

export interface TaskList {
  userName: string;
  userId: number;
  userTasks: Task[];
}