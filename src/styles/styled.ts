import { styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';

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