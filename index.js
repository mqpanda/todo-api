import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import accountRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
app.use(accountRoutes);
app.use(taskRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log(`Server started on port ${PORT}`);
});
