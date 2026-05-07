const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { createTask, getMyTasks } = require("../controllers/taskController");

router.post("/", protect, createTask);
router.get("/", protect, getMyTasks);

module.exports = router;
