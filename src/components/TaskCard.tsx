import React from 'react';
import { styled } from '@mui/material/styles';
import { Card, CardContent, Chip } from '@mui/material';
import type { Task } from '../types/task';
import {
  RowBetween,
  FlexCol,
  IconRow,
  ChipsRow,
  TaskTitle,
  TaskDescription,
} from '../styles/styled';

interface TaskCardProps {
  priority: number;
}

const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'priority',
})<TaskCardProps>`
  && {
    margin-bottom: 12px;
    border-left: 6px solid
      ${({ priority }: TaskCardProps) =>
        ['#9e9e9e', '#4caf50', '#2196f3', '#ff9800', '#f44336'][priority - 1]};
    border-radius: 10px;
    transition: 0.2s;
    &:hover {
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
    }
  }
`;

interface Props {
  task: Task;
}

const TaskCard: React.FC<Props> = ({ task }) => {
  const pr = Number(task.taskPreorety);
  return (
    <StyledCard priority={pr} elevation={1}>
      <CardContent>
        <RowBetween>
          <FlexCol>
            <TaskTitle variant="h6">{task.taskName}</TaskTitle>
            <TaskDescription variant="body2">{task.taskTitle}</TaskDescription>
            <ChipsRow>
              <Chip size="small" label={`📅 ${task.taskDeadLine}`} />
              <Chip size="small" label={`👤 ${task.taskExecutor}`} />
              <Chip size="small" label={`🏷 ${task.taskCategory}`} />
              <Chip
                size="small"
                color={pr >= 4 ? 'error' : pr >= 3 ? 'warning' : 'success'}
                label={`⚡ ${task.taskPreorety}`}
              />
            </ChipsRow>
          </FlexCol>
          <IconRow>{/* кнопки edit/delete добавим позже */}</IconRow>
        </RowBetween>
      </CardContent>
    </StyledCard>
  );
};

export default TaskCard;