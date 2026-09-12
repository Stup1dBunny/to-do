import React, { useMemo, useState } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { CalendarMonth as CalendarIcon } from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import type { Task, TaskList, DeadlineFilter } from './types/task';
import TaskCard from './components/TaskCard';
import FilterBar from './components/FilterBar';
import TaskDialog, { makeEmptyTask } from './components/TaskDialog';
import CalendarDialog from './components/CalendarDialog';
import { PageWrapper, Content, EmptyState } from './styles/styled';
import { parseDeadline, isWithinFilter, dayjs, type Dayjs } from './utils/date';
import { USERS, DATE_FORMAT, DATETIME_FORMAT } from './constants/task';

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
  const [data, setData] = useState<TaskList>(INITIAL_DATA);
  const [search, setSearch] = useState('');
  const [deadlineFilter, setDeadlineFilter] = useState<DeadlineFilter>('all');
  const [executorFilter, setExecutorFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Task>(() => makeEmptyTask(USERS[0]));

  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<Dayjs>(dayjs());

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

  const openCreate = (initialDay?: Dayjs) => {
    const base = initialDay ?? dayjs();
    const def = makeEmptyTask(USERS[0]);
    const time = dayjs().hour(12).minute(0);
    const date = base.hour(time.hour()).minute(time.minute());

    setDraft({ ...def, taskDeadLine: date.format(DATETIME_FORMAT) });
    setEditingId(null);
    setTaskDialogOpen(true);
  };

  const openEdit = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    setDraft({ ...task });
    setEditingId(id);
    setTaskDialogOpen(true);
  };

  const handleSave = (task: Task) => {
    setData((prev) => {
      const exists = prev.userTasks.some((t) => t.id === task.id);
      const list = exists
        ? prev.userTasks.map((t) => (t.id === task.id ? task : t))
        : [...prev.userTasks, task];
      return { ...prev, userTasks: list };
    });
    setTaskDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (!window.confirm('Удалить задачу?')) return;
    setData((prev) => ({
      ...prev,
      userTasks: prev.userTasks.filter((t) => t.id !== id),
    }));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
      <PageWrapper>
        <AppBar position="sticky" color="primary" elevation={1}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
              To-Do · {data.userName}
            </Typography>
            <Button
              color="inherit"
              startIcon={<CalendarIcon />}
              onClick={() => setCalendarOpen(true)}
            >
              Календарь
            </Button>
          </Toolbar>
        </AppBar>

        <Content>
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
            onAdd={() => openCreate()}
          />

          {filtered.length === 0 ? (
            <EmptyState>
              <Typography variant="h6">Задач не найдено</Typography>
              <Typography variant="body2">
                Измените фильтры или добавьте новую задачу
              </Typography>
            </EmptyState>
          ) : (
            filtered.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={openEdit}
                onDelete={handleDelete}
              />
            ))
          )}
        </Content>

        <TaskDialog
          open={taskDialogOpen}
          editingId={editingId}
          initialTask={draft}
          onClose={() => setTaskDialogOpen(false)}
          onSave={handleSave}
        />

        <CalendarDialog
          open={calendarOpen}
          onClose={() => setCalendarOpen(false)}
          tasks={tasks}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          onAddForDay={openCreate}
          onDeleteTask={handleDelete}
        />
      </PageWrapper>
    </LocalizationProvider>
  );
};

export default ToDoHome;