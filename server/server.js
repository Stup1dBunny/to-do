import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;
const FILE_PATH = path.join(__dirname, '..', 'taskList.json');

app.use(cors());
app.use(express.json({ limit: '2mb' }));

const EMPTY_DATA = {
  userName: 'Nikita',
  userId: 1,
  userTasks: [],
};

function readData() {
  try {
    if (!fs.existsSync(FILE_PATH)) {
      fs.writeFileSync(FILE_PATH, JSON.stringify(EMPTY_DATA, null, 2), 'utf-8');
      return EMPTY_DATA;
    }
    const raw = fs.readFileSync(FILE_PATH, 'utf-8');
    const parsed = JSON.parse(raw);

    // Защита: если в файле массив (старый формат) — берём первого пользователя
    if (Array.isArray(parsed)) {
      const first = parsed[0] ?? EMPTY_DATA;
      return {
        userName: first.userName ?? EMPTY_DATA.userName,
        userId: first.userId ?? EMPTY_DATA.userId,
        userTasks: Array.isArray(first.userTasks) ? first.userTasks : [],
      };
    }

    if (!parsed || typeof parsed !== 'object') return EMPTY_DATA;
    if (!Array.isArray(parsed.userTasks)) parsed.userTasks = [];
    return parsed;
  } catch (e) {
    console.error('Ошибка чтения taskList.json:', e);
    return EMPTY_DATA;
  }
}

function writeData(data) {
  const safe = {
    userName: data?.userName ?? EMPTY_DATA.userName,
    userId: data?.userId ?? EMPTY_DATA.userId,
    userTasks: Array.isArray(data?.userTasks) ? data.userTasks : [],
  };
  fs.writeFileSync(FILE_PATH, JSON.stringify(safe, null, 2), 'utf-8');
}

app.get('/api/taskList', (_req, res) => {
  res.json(readData());
});

app.put('/api/taskList', (req, res) => {
  try {
    writeData(req.body);
    res.json({ ok: true });
  } catch (e) {
    console.error('Ошибка записи taskList.json:', e);
    res.status(500).json({ ok: false, error: String(e) });
  }
});

app.listen(PORT, () => {
  console.log(`API ready: http://localhost:${PORT}/api/taskList`);
  console.log(`Файл: ${FILE_PATH}`);
});