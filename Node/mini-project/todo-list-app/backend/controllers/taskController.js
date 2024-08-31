const Task = require('../models/Task');

// Create a new task
exports.createTask = async (req, res) => {
    try {
        const { task, category, dueDate } = req.body;
        if (!task || !category || !dueDate) {
            return res.status(400).json({ error: 'All fields (task, category, dueDate) are required' });
        }

        // Validate date format (Optional: Add custom validation if needed)
        if (isNaN(Date.parse(dueDate))) {
            return res.status(400).json({ error: 'Invalid date format' });
        }

        // Create a new task with the user's ID
        const newTask = await Task.create({ 
            task, 
            category, 
            dueDate, 
            userId: req.user.id 
        });

        return res.status(201).json(newTask);
    } catch (error) {
        console.error('Error creating task:', error);
        return res.status(500).json({ error: 'Failed to create task' });
    }
};

// Get all tasks for the current user
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll({ where: { userId: req.user.id } });
        return res.status(200).json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return res.status(500).json({ error: 'Failed to fetch tasks' });
    }
};

// Update a task by ID
exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { task, category, dueDate } = req.body;

        // Find the task to update
        const existingTask = await Task.findOne({ where: { id, userId: req.user.id } });
        if (!existingTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Validate date format (Optional)
        if (dueDate && isNaN(Date.parse(dueDate))) {
            return res.status(400).json({ error: 'Invalid date format' });
        }

        // Update the task details
        const updatedTask = await existingTask.update({ task, category, dueDate });
        return res.status(200).json(updatedTask);
    } catch (error) {
        console.error('Error updating task:', error);
        return res.status(500).json({ error: 'Failed to update task' });
    }
};

// Delete a task by ID
exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the task to delete
        const task = await Task.findOne({ where: { id, userId: req.user.id } });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Delete the task
        await task.destroy();
        return res.status(204).send();  // No content to return
    } catch (error) {
        console.error('Error deleting task:', error);
        return res.status(500).json({ error: 'Failed to delete task' });
    }
};
