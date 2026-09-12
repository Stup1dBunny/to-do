import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import 'dayjs/locale/ru';
import { DATE_FORMAT, DATETIME_FORMAT } from '../constants/task';
import type { DeadlineFilter } from '../types/task';

dayjs.extend(customParseFormat);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.locale('ru');

export const parseDeadline = (s: string): Dayjs | null => {
  if (!s) return null;
  const withTime = dayjs(s, DATETIME_FORMAT, true);
  if (withTime.isValid()) return withTime;
  const onlyDate = dayjs(s, DATE_FORMAT, true);
  if (onlyDate.isValid()) return onlyDate.hour(23).minute(59);
  const loose = dayjs(s);
  return loose.isValid() ? loose : null;
};

export const isWithinFilter = (
  deadline: string,
  filter: DeadlineFilter
): boolean => {
  if (filter === 'all') return true;
  const d = parseDeadline(deadline);
  if (!d) return false;
  const now = dayjs();
  if (filter === 'today') return d.isSame(now, 'day');
  if (filter === 'week')
    return (
      d.isSameOrAfter(now.startOf('week')) && d.isSameOrBefore(now.endOf('week'))
    );
  if (filter === 'month') return d.isSame(now, 'month');
  return true;
};

export { dayjs };
export type { Dayjs };