document.addEventListener('DOMContentLoaded', () => {
    fetchTasks();

    document.getElementById('taskForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const task = document.getElementById('task').value;
        const category = document.getElementById('category').value;
        const dueDate = document.getElementById('dueDate').value;
        const token = localStorage.getItem('token'); 

        console.log('Form Submitted:', { task, category, dueDate });

        try {
            const response = await fetch('/api/tasks/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ task, category, dueDate })
            });

            const result = await response.json(); 

            if (response.ok) {
                console.log('Task created successfully:', result);
                document.getElementById('taskForm').reset();
                fetchTasks(); 
            } else {
                console.error('Failed to create task:', result);
                alert('Failed to create task: ' + result.error);
            }
        } catch (error) {
            console.error('Request error:', error);
            alert('Error: ' + error.message);
        }
    });

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
                const response = await fetch(`/api/tasks/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}` 
                    }
                });

                if (!response.ok) {
                    const result = await response.json();
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
});

async function fetchTasks() {
    const token = localStorage.getItem('token'); 

    try {
        const response = await fetch('/api/tasks/', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

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
                    <td>${new Date(task.dueDate).toISOString().split('T')[0]}</td>
                    <td><button onclick="editTask('${task.id}')">Edit</button></td>
                `;
                tbody.appendChild(row);
            });
        } else {
            console.error('Failed to fetch tasks:', result);
            alert('Failed to fetch tasks: ' + result.error);
        }
    } catch (error) {
        console.error('Request error:', error);
        alert('Error: ' + error.message);
    }
}

async function editTask(id) {
    const token = localStorage.getItem('token'); 

    try {
        const response = await fetch(`/api/tasks/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json(); 

        if (response.ok) {
            const task = result; 
            document.getElementById('task').value = task.task;
            document.getElementById('category').value = task.category;
            document.getElementById('dueDate').value = new Date(task.dueDate).toISOString().split('T')[0];

            document.getElementById('taskForm').onsubmit = async (e) => {
                e.preventDefault();
                await updateTask(id);   
            };
        } else {
            console.error('Failed to load task details:', result);
            alert('Failed to load task details: ' + result.error);
        }
    } catch (error) {
        console.error('Request error:', error); 
        alert('Error: ' + error.message);
    }
}

async function updateTask(id) {
    const task = document.getElementById('task').value;
    const category = document.getElementById('category').value;
    const dueDate = document.getElementById('dueDate').value;
    const token = localStorage.getItem('token'); 

    try {
        const response = await fetch(`/api/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ task, category, dueDate })
        });

        const result = await response.json(); 

        if (response.ok) {
            console.log('Task updated successfully:', result);
            document.getElementById('taskForm').reset();
            fetchTasks(); 
        } else {
            console.error('Failed to update task:', result);
            alert('Failed to update task: ' + result.error);
        }
    } catch (error) {
        console.error('Request error:', error); 
        alert('Error: ' + error.message);
    }
}
