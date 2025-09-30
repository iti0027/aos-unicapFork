import { Router } from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  updatedTask,
} from "../controllers/taskController.ts";

const router = Router();

router.get("/", getAllTasks);
router.get("/:taskId", getTaskById);
router.post("/", createTask);
router.put("/:taskId", updatedTask);
router.delete("/:taskId", deleteTask);

export default router;