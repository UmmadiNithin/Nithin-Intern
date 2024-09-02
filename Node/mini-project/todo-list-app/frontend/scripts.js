document.addEventListener('DOMContentLoaded', () => {
    fetchTasks();
    displayUserInfo();

    const taskForm = document.getElementById('taskForm');
    let isEditing = false;
    let editingTaskId = null;

    const modal = document.getElementById('taskModal');
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.querySelector('#taskModal .close');

    openModalBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    taskForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('taskTitle').value;
        const description = document.getElementById('taskDescription').value;
        const status = document.getElementById('taskStatus').value;
        const dueDate = document.getElementById('taskDueDate').value;
        const priority = document.getElementById('taskPriority').value;
        const token = localStorage.getItem('authToken');

        if (!token) {
            alert('You are not logged in!');
            return;
        }

        try {
            let response;
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            };
            const body = JSON.stringify({ title, description, status, dueDate, priority });

            if (isEditing && editingTaskId) {
                // Update task
                response = await fetch(`http://localhost:3000/api/tasks/task/update/${editingTaskId}`, {
                    method: 'PUT',
                    headers,
                    body
                });
            } else {
                // Create new task
                response = await fetch('http://localhost:3000/api/tasks/task/create', {
                    method: 'POST',
                    headers,
                    body
                });
            }

            if (response.ok) {
                const result = await response.json();
                console.log('Task processed successfully:', result);
                taskForm.reset();
                modal.style.display = 'none';
                isEditing = false;
                editingTaskId = null;
                fetchTasks();
            } else {
                const errorText = await response.text();
                console.error('Failed to process task:', errorText);
                alert('Failed to process task: ' + errorText);
            }
        } catch (error) {
            console.error('Request error:', error);
            alert('Error: ' + error.message);
        }
    });

    document.getElementById('deleteSelectedBtn').addEventListener('click', async () => {
        const selectedCheckboxes = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'));
        const selectedIds = selectedCheckboxes.map(cb => cb.dataset.id);

        if (selectedIds.length === 0) {
            alert('No tasks selected');
            return;
        }

        const token = localStorage.getItem('authToken');

        if (!token) {
            alert('You are not logged in!');
            return;
        }

        try {
            for (const id of selectedIds) {
                const response = await fetch(`http://localhost:3000/api/tasks/task/delete/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('Failed to delete task:', id, errorText);
                    alert('Failed to delete task with ID: ' + id + ' - ' + errorText);
                }
            }
            fetchTasks();
        } catch (error) {
            console.error('Request error:', error);
            alert('Error: ' + error.message);
        }
    });

    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('username');
        window.location.href = 'login.html'; 
    });
});

async function fetchTasks() {
    const token = localStorage.getItem('authToken');

    if (!token) {
        alert('You are not logged in!');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/tasks/tasks', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const result = await response.json();
            const tasks = result;
            const tasksContainer = document.getElementById('tasksContainer');
            tasksContainer.innerHTML = '';

            tasks.forEach(task => {
                const taskBox = document.createElement('div');
                taskBox.className = 'task-box';
                taskBox.innerHTML = `
                    <input type="checkbox" data-id="${task.id}">
                    <h3>${task.title}</h3>
                    <p><strong>Description:</strong> ${task.description}</p>
                    <p><strong>Status:</strong> ${task.status}</p>
                    <p><strong>Due Date:</strong> ${task.dueDate}</p>
                    <p><strong>Priority:</strong> ${task.priority}</p>
                    <button onclick="editTask('${task.id}')">Edit</button>
                `;
                tasksContainer.appendChild(taskBox);
            });
        } else {
            const errorText = await response.text();
            console.error('Failed to fetch tasks:', errorText);
            alert('Failed to fetch tasks: ' + errorText);
        }
    } catch (error) {
        console.error('Request error:', error);
        alert('Error: ' + error.message);
    }
}

async function editTask(id) {
    const token = localStorage.getItem('authToken');

    if (!token) {
        alert('You are not logged in!');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/tasks/task/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const result = await response.json();
            const task = result;
            document.getElementById('taskTitle').value = task.title;
            document.getElementById('taskDescription').value = task.description;
            document.getElementById('taskStatus').value = task.status;
            document.getElementById('taskDueDate').value = task.dueDate.split('T')[0];
            document.getElementById('taskPriority').value = task.priority;

            isEditing = true;
            editingTaskId = id;

            document.getElementById('taskModal').style.display = 'block';
        } else {
            const errorText = await response.text();
            console.error('Failed to fetch task for editing:', errorText);
            alert('Failed to fetch task: ' + errorText);
        }
    } catch (error) {
        console.error('Request error:', error);
        alert('Error: ' + error.message);
    }
}

function displayUserInfo() {
    const username = localStorage.getItem('username');
    const profileElement = document.getElementById('profile');

    if (profileElement) {
        if (username) {
            profileElement.textContent = `Welcome, ${username}`;
        } else {
            profileElement.textContent = "Welcome, Guest";
        }
    }
}
