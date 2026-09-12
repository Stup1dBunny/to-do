import React from 'react';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  InputAdornment,
  Button,
} from '@mui/material';
import { Search as SearchIcon, Add as AddIcon } from '@mui/icons-material';
import { FilterBar as FilterBarStyled, ActionsRight } from '../styles/styled';
import { CATEGORIES, PRIORITIES, USERS } from '../constants/task';
import type { DeadlineFilter } from '../types/task';

interface Props {
  search: string;
  setSearch: (v: string) => void;
  deadlineFilter: DeadlineFilter;
  setDeadlineFilter: (v: DeadlineFilter) => void;
  executorFilter: string;
  setExecutorFilter: (v: string) => void;
  categoryFilter: string;
  setCategoryFilter: (v: string) => void;
  priorityFilter: string;
  setPriorityFilter: (v: string) => void;
  onAdd: () => void;
}

const FilterBar: React.FC<Props> = ({
  search,
  setSearch,
  deadlineFilter,
  setDeadlineFilter,
  executorFilter,
  setExecutorFilter,
  categoryFilter,
  setCategoryFilter,
  priorityFilter,
  setPriorityFilter,
  onAdd,
}) => {
  return (
    <FilterBarStyled elevation={2}>
      <Stack spacing={2}>
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          placeholder="Поиск по названию..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
        />
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <FormControl fullWidth size="small">
            <InputLabel>Сроки</InputLabel>
            <Select
              label="Сроки"
              value={deadlineFilter}
              onChange={(e) => setDeadlineFilter(e.target.value as DeadlineFilter)}
            >
              <MenuItem value="all">Все</MenuItem>
              <MenuItem value="today">Сегодня</MenuItem>
              <MenuItem value="week">На этой неделе</MenuItem>
              <MenuItem value="month">В этом месяце</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel>Исполнитель</InputLabel>
            <Select
              label="Исполнитель"
              value={executorFilter}
              onChange={(e) => setExecutorFilter(e.target.value)}
            >
              <MenuItem value="all">Все</MenuItem>
              {USERS.map((u) => (
                <MenuItem key={u} value={u}>
                  {u}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel>Категория</InputLabel>
            <Select
              label="Категория"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <MenuItem value="all">Все</MenuItem>
              {CATEGORIES.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel>Приоритет</InputLabel>
            <Select
              label="Приоритет"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <MenuItem value="all">Все</MenuItem>
              {PRIORITIES.map((p) => (
                <MenuItem key={p} value={p}>
                  {p}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>

        <ActionsRight>
          <Button variant="contained" startIcon={<AddIcon />} onClick={onAdd}>
            Добавить задачу
          </Button>
        </ActionsRight>
      </Stack>
    </FilterBarStyled>
  );
};

export default FilterBar;