import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, Close as CloseIcon } from '@mui/icons-material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import type { Task } from '../types/task';
import { DATE_FORMAT } from '../constants/task';
import { parseDeadline, dayjs, type Dayjs } from '../utils/date';
import CustomPickersDay from './CustomPickersDay';
import type { CustomDayProps } from './CustomPickersDay';
import {
  CalendarLayout,
  MiniTaskList,
  MiniTask,
  RowBetweenCenter,
  VerticalDivider,
  AddButtonFullWidth,
} from '../styles/styled';

interface Props {
  open: boolean;
  onClose: () => void;
  tasks: Task[];
  selectedDay: Dayjs;
  setSelectedDay: (d: Dayjs) => void;
  onAddForDay: (day: Dayjs) => void;
  onDeleteTask: (id: string) => void;
}

const CalendarDialog: React.FC<Props> = ({
  open,
  onClose,
  tasks,
  selectedDay,
  setSelectedDay,
  onAddForDay,
  onDeleteTask,
}) => {
  // Множество дат (DD.MM.YYYY), в которые есть задачи — для точек
  const daysWithTasks = React.useMemo(() => {
    const set = new Set<string>();
    tasks.forEach((t) => {
      const d = parseDeadline(t.taskDeadLine);
      if (d) set.add(d.format(DATE_FORMAT));
    });
    return set;
  }, [tasks]);

  const dayTasks = React.useMemo(() => {
    const key = selectedDay.format(DATE_FORMAT);
    return tasks
      .filter((t) => parseDeadline(t.taskDeadLine)?.format(DATE_FORMAT) === key)
      .sort((a, b) => {
        const da = parseDeadline(a.taskDeadLine)?.valueOf() ?? 0;
        const db = parseDeadline(b.taskDeadLine)?.valueOf() ?? 0;
        return da - db;
      });
  }, [tasks, selectedDay]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" closeAfterTransition={false}>
      <DialogTitle>
        <RowBetweenCenter>
          <span>Календарь задач</span>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </RowBetweenCenter>
      </DialogTitle>
      <DialogContent dividers>
        <CalendarLayout>
          <div>
            <DateCalendar
              value={selectedDay}
              onChange={(v) => v && setSelectedDay(v)}
              slots={{
                day: (dayProps) => (
                  <CustomPickersDay
                    {...(dayProps as unknown as CustomDayProps)}
                    daysWithTasks={daysWithTasks}
                  />
                ),
              }}
            />
          </div>

          <VerticalDivider orientation="vertical" flexItem />

          <MiniTaskList>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }} gutterBottom>
              {selectedDay.format('DD MMMM YYYY')}
            </Typography>

            {dayTasks.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                Нет задач на этот день
              </Typography>
            ) : (
              dayTasks.map((t) => {
                const dt = parseDeadline(t.taskDeadLine);
                return (
                  <MiniTask key={t.id}>
                    <RowBetweenCenter>
                      <div>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {t.taskName}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ display: 'block' }}
                        >
                          🕒 {dt ? dt.format('HH:mm') : '—'} · {t.taskCategory} · ⚡
                          {t.taskPreorety} · {t.taskExecutor}
                        </Typography>
                      </div>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => onDeleteTask(t.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </RowBetweenCenter>
                  </MiniTask>
                );
              })
            )}

            <AddButtonFullWidth
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => {
                onClose();
                onAddForDay(selectedDay);
              }}
            >
              Добавить задачу на этот день
            </AddButtonFullWidth>
          </MiniTaskList>
        </CalendarLayout>
      </DialogContent>
    </Dialog>
  );
};

export default CalendarDialog;