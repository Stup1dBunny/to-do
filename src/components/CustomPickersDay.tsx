import React from 'react';
import { PickerDay } from '@mui/x-date-pickers/PickerDay';
import { DayCellWrapper, DayDot } from '../styles/styled';
import { DATE_FORMAT } from '../constants/task';
import type { Dayjs } from '../utils/date';

export interface CustomDayProps {
  day: Dayjs;
  outsideCurrentMonth: boolean;
  daysWithTasks: Set<string>;
  onDaySelect: (day: Dayjs) => void;
  [key: string]: unknown;
}

const CustomPickersDay: React.FC<CustomDayProps> = (props) => {
  const { daysWithTasks, day, outsideCurrentMonth, onDaySelect, ...other } = props;
  const hasTasks =
    !outsideCurrentMonth && daysWithTasks.has(day.format(DATE_FORMAT));

  return (
    <DayCellWrapper>
      <PickerDay
        {...(other as Record<string, unknown>)}
        day={day}
        outsideCurrentMonth={outsideCurrentMonth}
        onDaySelect={onDaySelect}
      />
      {hasTasks && <DayDot />}
    </DayCellWrapper>
  );
};

export default CustomPickersDay;