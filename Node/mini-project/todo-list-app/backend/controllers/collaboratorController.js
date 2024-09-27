const Collaborator = require('../models/Collaborator');
const Task = require('../models/Task');
const User = require('../models/User');

exports.addCollaborator = async (req, res) => {
    try {
        const { userId, taskId } = req.body;

        // Check if the task exists and belongs to the logged-in user
        const task = await Task.findOne({ where: { id: taskId, userId: req.user.id } });
        if (!task) return res.status(404).json({ message: 'Task not found' });

        // Check if the user exists
        const collaboratorUser = await User.findOne({ where: { id: userId } });
        if (!collaboratorUser) return res.status(404).json({ message: 'User not found' });

        // Add collaborator
        await Collaborator.create({ userId, taskId });

        res.status(201).json({ message: 'Collaborator added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
