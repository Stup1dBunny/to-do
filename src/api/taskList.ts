import type { Task, TaskList, TaskCategory } from '../types/task';
import { generateId } from '../utils/id';
import { USERS } from '../constants/task';

const API_URL = '/api/taskList';

const EMPTY_DATA: TaskList = {
  userName: 'Nikita',
  userId: 1,
  userTasks: [],
};

/** Совместимость со старыми данными: если у задачи нет id — генерируем. */
export const normalizeTaskList = (raw: unknown): TaskList => {
  if (!raw || typeof raw !== 'object') return EMPTY_DATA;

  const data = raw as Partial<TaskList>;
  const tasks = Array.isArray(data.userTasks) ? data.userTasks : [];

  return {
    userName: data.userName ?? EMPTY_DATA.userName,
    userId: data.userId ?? EMPTY_DATA.userId,
    userTasks: tasks.map((t) => ({
      id: (t as Task).id ?? generateId(),
      taskName: (t as Task).taskName ?? '',
      taskTitle: (t as Task).taskTitle ?? '',
      taskDeadLine: (t as Task).taskDeadLine ?? '',
      taskExecutor: (t as Task).taskExecutor ?? USERS[0],
      taskCategory: ((t as Task).taskCategory ?? 'Другое') as TaskCategory,
      taskPreorety: (t as Task).taskPreorety ?? '3',
    })),
  };
};

export const fetchTasks = async (): Promise<TaskList> => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const raw = await res.json();
  return normalizeTaskList(raw);
};

export const persistTasks = async (data: TaskList): Promise<void> => {
  const res = await fetch(API_URL, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
};