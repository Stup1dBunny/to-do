import { styled } from '@mui/material/styles';
import { Card, Typography, Button, Divider } from '@mui/material';

export const PageWrapper = styled('div')`
  min-height: 100vh;
  background: #f5f7fb;
`;

export const Content = styled('div')`
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px 16px 80px;
`;

export const FilterBar = styled(Card)`
  && {
    padding: 16px;
    margin-bottom: 24px;
    border-radius: 12px;
  }
`;

export const TaskTitle = styled(Typography)`
  && {
    font-weight: 600;
    word-break: break-word;
  }
`;

export const TaskDescription = styled(Typography)`
  && {
    color: #666;
    margin-top: 4px;
    white-space: pre-wrap;
  }
`;

export const EmptyState = styled('div')`
  text-align: center;
  padding: 48px 16px;
  color: #888;
`;

export const RowBetween = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
`;

export const RowBetweenCenter = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

export const FlexCol = styled('div')`
  flex: 1;
`;

export const IconRow = styled('div')`
  display: flex;
  gap: 4px;
`;

export const ChipsRow = styled('div')`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
`;

export const ActionsRight = styled('div')`
  display: flex;
  justify-content: flex-end;
`;

export const CalendarLayout = styled('div')`
  display: flex;
  gap: 16px;
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

export const MiniTaskList = styled('div')`
  flex: 1;
  max-height: 400px;
  overflow-y: auto;
  padding-right: 8px;
`;

export const MiniTask = styled('div')`
  padding: 10px 12px;
  border-radius: 8px;
  background: #f0f3f9;
  margin-bottom: 8px;
`;

export const VerticalDivider = styled(Divider)`
  && {
    @media (max-width: 700px) {
      display: none;
    }
  }
`;

export const AddButtonFullWidth = styled(Button)`
  && {
    margin-top: 12px;
    width: 100%;
  }
`;

export const DayCellWrapper = styled('div')`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const DayDot = styled('span')`
  position: absolute;
  left: 50%;
  bottom: 2px;
  transform: translateX(-50%);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #1976d2;
  pointer-events: none;
`;