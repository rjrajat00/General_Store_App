const Task = require("../models/todo");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();

    res.send(tasks);
  } catch (error) {
    return res.status(400).send("Unable to get Tasks", error);
  }
};

const addTasks = async (req, res) => {
  try {
    const { task, details } = req.body;

    const newTask = await Task.create({ task, details });

    res.status(201).send(newTask);
  } catch (error) {
    res.status(404).send("Unable to get Tasks");
  }
};

const updateTasks = async (req, res) => {
  try {
    const { id } = req.params;
    const { task, details } = req.body;

    const existingTask = await Task.findByPk(id);

    if (existingTask) {
      const newTask = await existingTask.update({ task, details });
      res.send(newTask);
    }
  } catch (error) {
    res.status(404).send("Unable to get Tasks");
  }
};

const deleteTasks = async (req, res) => {
  try {
    const { id } = req.params;
    const tasks = await Task.findByPk(id);

    if (tasks) await tasks.destroy();

    res.status(201).send(tasks);
  } catch (error) {
    res.status(400).send("Unable to find task", error);
  }
};

module.exports = { getAllTasks, addTasks, updateTasks, deleteTasks };
