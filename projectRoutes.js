const express = require('express');
const Project = require('../models/Project');
const Task = require('../models/Task');

const router = express.Router();

// Create a new project
router.post('/', async (req, res) => {
  const project = new Project({ name: req.body.name, tasks: [] });
  await project.save();
  res.status(201).json(project);
});

// Get all projects
router.get('/', async (req, res) => {
  const projects = await Project.find().populate('tasks');
  res.json(projects);
});

// Add a task to a project
router.post('/:projectId/tasks', async (req, res) => {
  const { text, deadline, priority } = req.body;
  const project = await Project.findById(req.params.projectId);
  if (!project) return res.status(404).send('Project not found');

  const task = new Task({ text, status: 'Not Done', priority, deadline, comments: [] });
  await task.save();
  project.tasks.push(task);
  await project.save();

  res.status(201).json(task);
});

// Update task status, priority, and deadline
router.put('/:projectId/tasks/:taskId', async (req, res) => {
  const { status, priority, deadline } = req.body;
  const task = await Task.findById(req.params.taskId);
  if (!task) return res.status(404).send('Task not found');

  task.status = status;
  task.priority = priority;
  task.deadline = deadline;
  await task.save();

  res.json(task);
});

// Add a comment to a task
router.post('/:projectId/tasks/:taskId/comments', async (req, res) => {
  const task = await Task.findById(req.params.taskId);
  if (!task) return res.status(404).send('Task not found');

  task.comments.push(req.body.comment);
  await task.save();

  res.json(task);
});

// Delete a task
router.delete('/:projectId/tasks/:taskId', async (req, res) => {
  await Task.findByIdAndDelete(req.params.taskId);
  res.json({ message: 'Task deleted' });
});

module.exports = router;
