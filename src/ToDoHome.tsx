import React, { useMemo, useState } from 'react';
import { Typography } from '@mui/material';
import type { Task, TaskList, DeadlineFilter } from './types/task';
import TaskCard from './components/TaskCard';
import FilterBar from './components/FilterBar';
import { PageWrapper, Content, EmptyState } from './styles/styled';
import { parseDeadline, isWithinFilter } from './utils/date';

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
  const [search, setSearch] = useState('');
  const [deadlineFilter, setDeadlineFilter] = useState<DeadlineFilter>('all');
  const [executorFilter, setExecutorFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const tasks: Task[] = data.userTasks;

  const filtered = useMemo(() => {
    const list = tasks.filter((t) => {
      if (
        search &&
        !t.taskName.toLowerCase().includes(search.toLowerCase()) &&
        !t.taskTitle.toLowerCase().includes(search.toLowerCase())
      )
        return false;
      if (!isWithinFilter(t.taskDeadLine, deadlineFilter)) return false;
      if (executorFilter !== 'all' && t.taskExecutor !== executorFilter) return false;
      if (categoryFilter !== 'all' && t.taskCategory !== categoryFilter) return false;
      if (priorityFilter !== 'all' && t.taskPreorety !== priorityFilter) return false;
      return true;
    });

    return [...list].sort((a, b) => {
      const da = parseDeadline(a.taskDeadLine)?.valueOf() ?? 0;
      const db = parseDeadline(b.taskDeadLine)?.valueOf() ?? 0;
      return da - db;
    });
  }, [tasks, search, deadlineFilter, executorFilter, categoryFilter, priorityFilter]);

  return (
    <PageWrapper>
      <Content>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
          To-Do · {data.userName}
        </Typography>

        <FilterBar
          search={search}
          setSearch={setSearch}
          deadlineFilter={deadlineFilter}
          setDeadlineFilter={setDeadlineFilter}
          executorFilter={executorFilter}
          setExecutorFilter={setExecutorFilter}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
          onAdd={() => {
            /* откроем модалку на следующем этапе */
          }}
        />

        {filtered.length === 0 ? (
          <EmptyState>
            <Typography variant="h6">Задач не найдено</Typography>
            <Typography variant="body2">
              Измените фильтры или добавьте новую задачу
            </Typography>
          </EmptyState>
        ) : (
          filtered.map((task) => <TaskCard key={task.id} task={task} />)
        )}
      </Content>
    </PageWrapper>
  );
};

export default ToDoHome;