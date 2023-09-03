const express = require("express");

const router = express.Router();

const TaskController = require("../controllers/taskController");

/////////

router.get("/", TaskController.getAllTasks);
router.post("/", TaskController.addTasks);
router.put("/:id", TaskController.updateTasks);
router.delete("/:id", TaskController.deleteTasks);

module.exports = router;
