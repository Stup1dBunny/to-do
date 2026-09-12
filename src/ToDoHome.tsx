import React, { useState } from 'react';
import { Card, CardContent, Typography, Stack } from '@mui/material';
import type { Task, TaskList } from './types/task';

const INITIAL_DATA: TaskList = {
  userName: 'Nikita',
  userId: 1,
  userTasks: [
    {
      id: 'seed-1',
      taskName: 'Убраться',
      taskTitle: 'Убраться дома',
      taskDeadLine: '15.09.2026 18:00',
      taskExecutor: 'Nikita',
      taskCategory: 'Домашнее',
      taskPreorety: '5',
    },
    {
      id: 'seed-2',
      taskName: 'Прочитать книгу',
      taskTitle: 'Глава 3 по саморазвитию',
      taskDeadLine: '14.09.2026 20:00',
      taskExecutor: 'Nikita',
      taskCategory: 'Саморазвитие',
      taskPreorety: '4',
    },
  ],
};

const ToDoHome: React.FC = () => {
  const [data] = useState<TaskList>(INITIAL_DATA);
  const tasks: Task[] = data.userTasks;

  return (
    <Stack spacing={2} sx={{ maxWidth: 800, margin: '0 auto', padding: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 600 }}>
        To-Do · {data.userName}
      </Typography>

      {tasks.map((task) => (
        <Card key={task.id} elevation={1}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {task.taskName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {task.taskTitle}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              📅 {task.taskDeadLine} · 👤 {task.taskExecutor} · 🏷{' '}
              {task.taskCategory} · ⚡ {task.taskPreorety}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};

export default ToDoHome;