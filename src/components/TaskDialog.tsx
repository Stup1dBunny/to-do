import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Alert,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import type { Task, TaskCategory } from '../types/task';
import { CATEGORIES, PRIORITIES, USERS, DATETIME_FORMAT } from '../constants/task';
import { parseDeadline, dayjs, type Dayjs } from '../utils/date';
import { generateId } from '../utils/id';

interface Props {
  open: boolean;
  editingId: string | null;
  initialTask: Task;
  onClose: () => void;
  onSave: (task: Task) => void;
}

export const makeEmptyTask = (executor: string): Task => {
  const now = dayjs().add(1, 'hour').minute(0);
  return {
    id: generateId(),
    taskName: '',
    taskTitle: '',
    taskDeadLine: now.format(DATETIME_FORMAT),
    taskExecutor: executor,
    taskCategory: 'Другое',
    taskPreorety: '3',
  };
};

const TaskDialog: React.FC<Props> = ({
  open,
  editingId,
  initialTask,
  onClose,
  onSave,
}) => {
  const [draft, setDraft] = useState<Task>(initialTask);
  const [draftDate, setDraftDate] = useState<Dayjs | null>(dayjs());
  const [draftTime, setDraftTime] = useState<Dayjs | null>(
    dayjs().hour(12).minute(0)
  );
  const [error, setError] = useState<string>('');

  // Синхронизация с входящей задачей при открытии
  useEffect(() => {
    if (!open) return;
    const parsed = parseDeadline(initialTask.taskDeadLine) ?? dayjs();
    setDraft(initialTask);
    setDraftDate(parsed);
    setDraftTime(parsed);
    setError('');
  }, [open, initialTask]);

  const handleSave = () => {
    if (!draft.taskName.trim()) return setError('Введите название задачи');
    if (!draft.taskTitle.trim()) return setError('Введите заголовок задачи');
    if (!draftDate) return setError('Выберите дату дедлайна');
    if (!draftTime) return setError('Выберите время дедлайна');

    const combined = draftDate
      .hour(draftTime.hour())
      .minute(draftTime.minute())
      .second(0);

    onSave({
      ...draft,
      taskDeadLine: combined.format(DATETIME_FORMAT),
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" closeAfterTransition={false}>
      <DialogTitle>
        {editingId === null ? 'Новая задача' : 'Редактировать задачу'}
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2} sx={{ mt: 1 }}>
          {error && <Alert severity="error">{error}</Alert>}

          <TextField
            label="Название"
            fullWidth
            value={draft.taskName}
            onChange={(e) => setDraft({ ...draft, taskName: e.target.value })}
          />

          <TextField
            label="Описание"
            fullWidth
            multiline
            minRows={2}
            value={draft.taskTitle}
            onChange={(e) => setDraft({ ...draft, taskTitle: e.target.value })}
          />

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <DatePicker
              label="Дата"
              value={draftDate}
              onChange={(v) => setDraftDate(v)}
              format="DD.MM.YYYY"
              slotProps={{ textField: { fullWidth: true } }}
            />
            <TimePicker
              label="Время"
              value={draftTime}
              onChange={(v) => setDraftTime(v)}
              ampm={false}
              format="HH:mm"
              slotProps={{ textField: { fullWidth: true } }}
            />
          </Stack>

          <FormControl fullWidth>
            <InputLabel>Исполнитель</InputLabel>
            <Select
              label="Исполнитель"
              value={draft.taskExecutor}
              onChange={(e) => setDraft({ ...draft, taskExecutor: e.target.value })}
            >
              {USERS.map((u) => (
                <MenuItem key={u} value={u}>
                  {u}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Категория</InputLabel>
            <Select
              label="Категория"
              value={draft.taskCategory}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  taskCategory: e.target.value as TaskCategory,
                })
              }
            >
              {CATEGORIES.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Приоритет</InputLabel>
            <Select
              label="Приоритет"
              value={draft.taskPreorety}
              onChange={(e) => setDraft({ ...draft, taskPreorety: e.target.value })}
            >
              {PRIORITIES.map((p) => (
                <MenuItem key={p} value={p}>
                  {p}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button variant="contained" onClick={handleSave}>
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskDialog;