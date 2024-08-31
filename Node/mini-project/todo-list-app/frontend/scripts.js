document.addEventListener('DOMContentLoaded', () => {
    fetchTasks();
    displayUserInfo();

    document.getElementById('taskForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const task = document.getElementById('task').value;
        const category = document.getElementById('category').value;
        const dueDate = document.getElementById('dueDate').value;
        const token = localStorage.getItem('token'); 

        console.log('Form Submitted:', { task, category, dueDate });

        try {
            const response = await fetch('http://localhost:3000/api/tasks/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ task, category, dueDate })
            });

            console.log('Response Status:', response.status);
            console.log('Response Headers:', response.headers);
            const result = await response.json(); 

            if (response.ok) {
                console.log('Task created successfully:', result);
                document.getElementById('taskForm').reset();
                fetchTasks(); 
            } else {
                console.error('Failed to create task:', result);
                alert('Failed to create task: ' + result.message);
            }
        } catch (error) {
            console.error('Request error:', error);
            alert('Error: ' + error.message);
        }
    });

    // Handle delete selected tasks
    document.getElementById('deleteSelectedBtn').addEventListener('click', async () => {
        const selectedIds = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
                                  .map(cb => cb.dataset.id);

        if (selectedIds.length === 0) {
            alert('No tasks selected');
            return;
        }

        const token = localStorage.getItem('token'); 

        try {
            for (const id of selectedIds) {
                const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}` 
                    }
                });

                console.log('Delete Response Status:', response.status);
                console.log('Delete Response Headers:', response.headers);
                const result = await response.json(); 

                if (!response.ok) {
                    console.error('Failed to delete task:', id, result); 
                    alert('Failed to delete task with ID: ' + id);
                }
            }
            fetchTasks(); 
        } catch (error) {
            console.error('Request error:', error); 
            alert('Error: ' + error.message);
        }
    });

    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        window.location.reload();
    });
});

// Fetch and display tasks
async function fetchTasks() {
    const token = localStorage.getItem('token'); 

    try {
        const response = await fetch('http://localhost:3000/api/tasks/', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        console.log('Fetch Response Status:', response.status);
        console.log('Fetch Response Headers:', response.headers);
        const result = await response.json(); 

        if (response.ok) {
            const tasks = result; 
            const tbody = document.querySelector('#tasksTable tbody');
            tbody.innerHTML = '';

            tasks.forEach(task => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td><input type="checkbox" data-id="${task.id}"></td>
                    <td>${task.task}</td>
                    <td>${task.category}</td>
                    <td>${task.dueDate}</td>
                    <td><button onclick="editTask('${task.id}')">Edit</button></td>
                `;
                tbody.appendChild(row);
            });
        } else {
            console.error('Failed to fetch tasks:', result);
            alert('Failed to fetch tasks: ' + result.message);
        }
    } catch (error) {
        console.error('Request error:', error);
        alert('Error: ' + error.message);
    }
}

// Edit task
async function editTask(id) {
    const token = localStorage.getItem('token'); 

    try {
        const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json'
            }
        });

        console.log('Edit Task Response Status:', response.status);
        console.log('Edit Task Response Headers:', response.headers);
        const result = await response.json(); 

        if (response.ok) {
            const task = result; 
            document.getElementById('task').value = task.task;
            document.getElementById('category').value = task.category;
            document.getElementById('dueDate').value = task.dueDate;

            document.getElementById('taskForm').onsubmit = async (e) => {
                e.preventDefault();
                await updateTask(id);   
            };
        } else {
            console.error('Failed to load task details:', result);
            alert('Failed to load task details: ' + result.message);
        }
    } catch (error) {
        console.error('Request error:', error); 
        alert('Error: ' + error.message);
    }
}

// Update task
async function updateTask(id) {
    const task = document.getElementById('task').value;
    const category = document.getElementById('category').value;
    const dueDate = document.getElementById('dueDate').value;
    const token = localStorage.getItem('token'); 

    try {
        const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ task, category, dueDate })
        });

        console.log('Update Task Response Status:', response.status);
        console.log('Update Task Response Headers:', response.headers);
        const result = await response.json(); 

        if (response.ok) {
            console.log('Task updated successfully:', result);
            document.getElementById('taskForm').reset();
            fetchTasks(); 
        } else {
            console.error('Failed to update task:', result);
            alert('Failed to update task: ' + result.message);
        }
    } catch (error) {
        console.error('Request error:', error); 
        alert('Error: ' + error.message);
    }
}

// Display user info
function displayUserInfo() {
    const username = localStorage.getItem('username');
    if (username) {
        document.getElementById('username').textContent = username;
    } else {
        document.getElementById('username').textContent = 'Guest';
    }
}
