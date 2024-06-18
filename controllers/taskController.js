import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createTask = async (req, res) => {
  const { title, description } = req.body;
  try {
    const task = await prisma.task.create({
      data: {
        title,
        description,
        userId: req.user.id,
      },
    });
    res.status(201).json(task);
  } catch (error) {
    console.error('Failed to create task:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      where: { userId: req.user.id },
    });
    res.json(tasks);
  } catch (error) {
    console.error('Failed to get tasks:', error);
    res.status(500).json({ error: 'Failed to get tasks' });
  }
};

export const getTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await prisma.task.findUnique({
      where: { id: parseInt(id), userId: req.user.id },
    });
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    console.error('Failed to get task:', error);
    res.status(500).json({ error: 'Failed to get task' });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  try {
    const task = await prisma.task.update({
      where: { id: parseInt(id), userId: req.user.id },
      data: { title, description, status },
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    console.error('Failed to update task:', error);
    res.status(400).json({ error: 'Failed to update task' });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await prisma.task.deleteMany({
      where: { id: parseInt(id), userId: req.user.id },
    });
    if (task.count === 0)
      return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (error) {
    console.error('Failed to delete task:', error);
    res.status(400).json({ error: 'Failed to delete task' });
  }
};
