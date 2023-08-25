const Task = require("../models/taskModel");
const { asyncHandler } = require("../middleware/ErrorHandler");

// const createTask = asyncHandler(async (req, res) => {
//   const task = await Task.create(req.body);
//   res.status(201).json(task);
// });
const createTask = asyncHandler(async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    throw error; // Re-throw the error to be caught by the error handler
  }
});


const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find().lean();
  res.status(200).json(tasks);
});

const getTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id).lean();
  if (!task) {
    res.status(404).json({ error: `No task with id: ${id}` });
  } else {
    res.status(200).json(task);
  }
});

const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByIdAndDelete(id);
  if (!task) {
    res.status(404).json({ error: `No task with id: ${id}` });
  } else {
    res.status(200).send("Task deleted");
  }
});

const updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    res.status(404).json({ error: `No task with id: ${id}` });
  } else {
    res.status(200).json(task);
  }
});

module.exports = {
  createTask,
  getTasks,
  getTask,
  deleteTask,
  updateTask,
};
