const Task = require('../models/Task');
const { Op } = require('sequelize');

// Define valid values for status and priority
const validStatuses = ['TODO', 'IN_PROGRESS', 'DONE']; 
const validPriorities = ['LOW', 'MEDIUM', 'HIGH']; 

// Create a new task
exports.createTask = async (req, res) => {
    try {
        const { title, description, status, dueDate, priority, isPinned } = req.body;
        console.log(req.body);
        
        // Validate required fields
        if (!title || !dueDate) {
            return res.status(400).json({ error: 'Title and due date are required' });
        }

        // Validate status and priority
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: `Invalid status value. Allowed values are ${validStatuses.join(', ')}` });
        }
        if (!validPriorities.includes(priority)) {
            return res.status(400).json({ error: `Invalid priority value. Allowed values are ${validPriorities.join(', ')}` });
        }

        // Validate date format
        if (isNaN(Date.parse(dueDate))) {
            return res.status(400).json({ error: 'Invalid date format' });
        }

        console.log("Creating new task..."); 

        // Create a new task with the user's ID
        const newTask = await Task.create({ 
            title, 
            description, 
            status, 
            dueDate, 
            priority, 
            isPinned,
            userId: req.user.id 
        });

        console.log("Task created successfully:", newTask); 

        return res.status(201).json({ newTask });
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

// Get a specific task for the current user
exports.getsingleTask = async (req, res) => {
    try {
        const taskId = req.params.id; 
        const userId = req.user.id;   

        const task = await Task.findOne({ where: { id: taskId, userId: userId } });

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        return res.status(200).json(task);
    } catch (error) {
        console.error('Error fetching task:', error);
        return res.status(500).json({ error: 'Failed to fetch task' });
    }
};




// Update a task by ID
exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status, dueDate, priority, isPinned } = req.body;

        // Find the task to update
        const existingTask = await Task.findOne({ where: { id, userId: req.user.id } });
        if (!existingTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Validate status and priority
        if (status && !validStatuses.includes(status)) {
            return res.status(400).json({ error: `Invalid status value. Allowed values are ${validStatuses.join(', ')}` });
        }
        if (priority && !validPriorities.includes(priority)) {
            return res.status(400).json({ error: `Invalid priority value. Allowed values are ${validPriorities.join(', ')}` });
        }

        // Validate date format
        if (dueDate && isNaN(Date.parse(dueDate))) {
            return res.status(400).json({ error: 'Invalid date format' });
        }

        // Update the task details
        const updatedTask = await existingTask.update({ 
            title, 
            description, 
            status, 
            dueDate, 
            priority, 
            isPinned 
        });

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
        return res.status(200).json({ status: 'Task deleted' });  

    } catch (error) {
        console.error('Error deleting task:', error);
        return res.status(500).json({ error: 'Failed to delete task' });
    }
};



// Search tasks by title
exports.searchTasks = async (req, res) => {
    const { title } = req.query; // Get the search query from the URL
console.log(title);

    if (!title) {
        return res.status(400).json({ error: 'Title is required to search' });
    }

    try {
        // Find tasks where the title matches exactly
        const exactMatchTask = await Task.findOne({
            where: {
                title: {
                    [Op.iLike]: title  // Case-insensitive exact match
                }
            }
        });

        // Find tasks where the title contains the search term (partial match)
        const relatedTasks = await Task.findAll({
            where: {
                title: {
                    [Op.iLike]: `%${title}%`  // Case-insensitive partial match
                }
            },
            order: [['createdAt', 'DESC']] // Order by creation date (optional)
        });

        // If exact match is found, prioritize it and remove from related tasks
        if (exactMatchTask) {
            return res.json({
                exactMatch: exactMatchTask,
                relatedTasks: relatedTasks.filter(task => task.id !== exactMatchTask.id)
            });
        }

        // Return only related tasks if no exact match is found
        return res.json({ relatedTasks });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
};


