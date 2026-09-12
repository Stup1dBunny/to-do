import React, { useState } from 'react';
import { Typography } from '@mui/material';
import type { Task, TaskList } from './types/task';
import TaskCard from './components/TaskCard';
import { PageWrapper, Content, EmptyState } from './styles/styled';

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
    <PageWrapper>
      <Content>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
          To-Do · {data.userName}
        </Typography>

        {tasks.length === 0 ? (
          <EmptyState>
            <Typography variant="h6">Задач пока нет</Typography>
          </EmptyState>
        ) : (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        )}
      </Content>
    </PageWrapper>
  );
};

export default ToDoHome;