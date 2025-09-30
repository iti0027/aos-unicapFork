import { Request, Response } from "express";
import { v4 as uuidV4 } from "uuid";
import tasks from "../models/Task.js";
import { taskType } from "../types/taskTypes.js";

const getAllTasks = (req: Request, res: Response) => {
  res.send({
    data: tasks,
  });
};

const getTaskById = (req: Request, res: Response) => {
  const { taskId } = req.params;

  const task = tasks.find((e) => e.id === taskId);
  if (!task) {
    res.status(404).send({
      error: "Task not found",
    });
  }
  res.status(200).send({
    data: task,
  });
};

const createTask = (req: Request, res: Response) => {
  const { description, completed } = req.body;

  if (!description || typeof description !== "string") {
    res
      .status(400)
      .json({ message: "Description is required and must be a string" });
    return;
  }

  const newTask: taskType = {
    id: uuidV4(),
    description: description,
    completed: completed ?? false,
  };

  tasks.push(newTask);
  res.status(201).send({
    message: "Created task",
    data: newTask,
  });
};

const updatedTask = (req: Request, res: Response) => {
  const { taskId } = req.params;
  const {
    description,
    completed,
  }: { description: string; completed: boolean } = req.body;

  if (!taskId) {
    return res.status(404).send({ message: "Provide the task ID" });
  }

  const task = tasks.find((e) => e.id === taskId);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  console.log(task);

  if (description !== undefined) {
    if (typeof description !== "string") {
      return res.status(400).json({ message: "Description must be a string" });
    }
    task.description = description;
  }

  if (completed !== undefined) {
    if (typeof completed !== "boolean") {
      return res.status(400).json({ message: "Completed must be a boolean" });
    }
    task.completed = completed;
  }

  return res.status(200).json({
    message: "Updated task",
    data: task,
  });
};

const deleteTask = (req: Request, res: Response) => {
  const { taskId } = req.params;

  const taskIndex = tasks.findIndex((e) => e.id === taskId);

  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    res.status(200).send({
      message: "Deleted task!",
    });
  } else {
    res.status(404).send({
      message: "Error! Task not found.",
    });
  }
};

export { createTask, deleteTask, getAllTasks, getTaskById, updatedTask };