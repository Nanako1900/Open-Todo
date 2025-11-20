import prisma from '../config/database.js';

export const getTodos = async (req, res) => {
  try {
    const todos = await prisma.todo.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
    });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
};

export const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const todo = await prisma.todo.create({
      data: {
        title,
        description,
        userId: req.user.id,
      },
    });
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create todo' });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const todo = await prisma.todo.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(completed !== undefined && { completed }),
      },
    });

    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update todo' });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await prisma.todo.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    await prisma.todo.delete({
      where: { id },
    });

    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
};
