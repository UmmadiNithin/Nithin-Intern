document.addEventListener('DOMContentLoaded', () => {
    fetchTasks();
    displayUserInfo();
    
        // Search functionality
        const searchBtn = document.getElementById('searchBtn');
        const searchInput = document.getElementById('searchInput');
    
        searchBtn.addEventListener('click', () => {
            const query = searchInput.value.trim();
            if (query) {
                searchTasks(query);
            } else {
                alert('Please enter a task title to search.');
            }
        });
    
        // Optional: Trigger search on pressing "Enter" key
        searchInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault(); // Prevent form submission
                searchBtn.click(); // Trigger the search button click
            }
        });
    });
    
    // Function to search tasks by title
    async function searchTasks(title) {
        const token = localStorage.getItem('authToken');
        if (!token) return alert('You are not logged in!');
    
        try {
            const response = await fetch(`http://localhost:3000/api/tasks/search?title=${encodeURIComponent(title)}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.ok) {
                const { exactMatch, relatedTasks } = await response.json();
                const tasksContainer = document.getElementById('tasksContainer');
                tasksContainer.innerHTML = ''; // Clear previous search results
    
                // Display exact match task first (if found)
                if (exactMatch) {
                    const taskBox = createTaskBox(exactMatch);
                    tasksContainer.appendChild(taskBox);
                }
    
                // Display related tasks (if any)
                relatedTasks.forEach(task => {
                    const taskBox = createTaskBox(task);
                    tasksContainer.appendChild(taskBox);
                });
    
                if (!exactMatch && relatedTasks.length === 0) {
                    tasksContainer.innerHTML = '<p>No tasks found matching your search criteria.</p>';
                }
    
            } else {
                alert('Failed to search tasks: ' + await response.text());
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    }
    
    // Helper function to create a task box (reusable)
    function createTaskBox(task) {
        const taskBox = document.createElement('div');
        taskBox.className = 'task-box';
        taskBox.style.backgroundColor = getRandomColor();
        taskBox.innerHTML = `
            <h2 class="task-title"><strong>Title : </strong> ${task.title}</h2>
            <p><strong>Description : </strong> ${task.description}</p>
            <p><strong>Status : </strong> ${task.status}</p>
            <p><strong>Due Date : </strong> ${task.dueDate}</p>
            <p><strong>Priority : </strong> ${task.priority}</p>
            <div class="task-buttons">
                <button class="edit-btn" data-task-id="${task.id}">Edit</button>
                <button class="delete-btn" data-task-id="${task.id}">Delete</button>
            </div>
        `;
        return taskBox;
    }
    
    const taskForm = document.getElementById('taskForm');
    let isEditing = false;
    let editingTaskId = null;

    const modal = document.getElementById('taskModal');
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.querySelector('#taskModal .close');

    // Open modal for adding a new task
    openModalBtn.addEventListener('click', () => {
        modal.style.display = 'block';
        taskForm.reset();
        document.getElementById('taskId').value = ''; 
        isEditing = false;
        editingTaskId = null;
    });

    closeModalBtn.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (event) => {
        if (event.target === modal) modal.style.display = 'none';
    });

    // Add or Edit task based on form submission
    taskForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const token = localStorage.getItem('authToken');
        if (!token) return alert('You are not logged in!');

        const taskData = {
            title: document.getElementById('taskTitle').value,
            description: document.getElementById('taskDescription').value,
            status: document.getElementById('taskStatus').value,
            dueDate: document.getElementById('taskDueDate').value,
            priority: document.getElementById('taskPriority').value
        };

        const taskId = document.getElementById('taskId').value;
        const url = taskId ? `http://localhost:3000/api/tasks/task/update/${taskId}` : 'http://localhost:3000/api/tasks/task/create';
        const method = taskId ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(taskData)
            });

            if (response.ok) {
                taskForm.reset();
                modal.style.display = 'none';
                fetchTasks();
            } else {
                alert('Failed to save task: ' + await response.text());
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    });

    // Logout functionality
    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('username');
        window.location.href = 'login.html';
    });


// Fetch and display tasks
async function fetchTasks() {
    const token = localStorage.getItem('authToken');
    if (!token) return alert('You are not logged in!');

    try {
        const response = await fetch('http://localhost:3000/api/tasks/tasks', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const tasks = await response.json();
            const tasksContainer = document.getElementById('tasksContainer');
            tasksContainer.innerHTML = '';

            tasks.forEach(task => {
                const taskBox = document.createElement('div');
                taskBox.className = 'task-box';
                taskBox.style.backgroundColor = getRandomColor();
                taskBox.innerHTML = `
                    <h2 class="task-title">
                        <strong class="label">Title : </strong>
                        <span class="value">${task.title}</span>
                    </h2>
                    <p>
                        <strong class="label">Description : </strong>
                        <span class="value">${task.description}</span>
                    </p>
                    <p>
                        <strong class="label">Status : </strong>
                        <span class="value">${task.status}</span>
                    </p>
                    <p>
                        <strong class="label">Due Date : </strong>
                        <span class="value">${task.dueDate}</span>
                    </p>
                    <p>
                        <strong class="label">Priority : </strong>
                        <span class="value">${task.priority}</span>
                    </p>
                    <div class="task-buttons">
                        <button class="edit-btn" data-task-id="${task.id}">Edit</button>
                        <button class="delete-btn" data-task-id="${task.id}">Delete</button>
                    </div>
                `;
                tasksContainer.appendChild(taskBox);
            });
            

            document.querySelectorAll('.edit-btn').forEach(button => {
                button.addEventListener('click', (e) => editTask(e.target.dataset.taskId));
            });

            document.querySelectorAll('.delete-btn').forEach(button => {
                button.addEventListener('click', (e) => deleteTask(e.target.dataset.taskId));
            });
        } else {
            alert('Failed to fetch tasks: ' + await response.text());
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
} 




// Function to delete a task
async function deleteTask(taskId) {
    const token = localStorage.getItem('authToken');
    if (!token) return alert('You are not logged in!');

    if (confirm('Are you sure you want to delete this task?')) {
        try {
            const response = await fetch(`http://localhost:3000/api/tasks/task/delete/${taskId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                alert('Task deleted successfully');
                fetchTasks(); 
            } else {
                alert('Failed to delete task: ' + await response.text());
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    }
}

// Edit task
async function editTask(id) {
    const token = localStorage.getItem('authToken');
    if (!token) return alert('You are not logged in!');

    try {
        const response = await fetch(`http://localhost:3000/api/tasks/singletask/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const task = await response.json();
            document.getElementById('taskTitle').value = task.title;
            document.getElementById('taskDescription').value = task.description;
            document.getElementById('taskStatus').value = task.status;
            document.getElementById('taskDueDate').value = task.dueDate.split('T')[0];
            document.getElementById('taskPriority').value = task.priority;
            document.getElementById('taskId').value = task.id;

            document.getElementById('taskModal').style.display = 'block';
        } else {
            alert('Failed to fetch task: ' + await response.text());
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Display user info
function displayUserInfo() {
    const username = localStorage.getItem('username');
    document.getElementById('username').textContent = username ? ` ${username}` : "Welcome, Guest";
}

// Generate random background colors for task boxes
function getRandomColor() {
    const colors = ['#FFEBEE', '#FCE4EC', '#F3E5F5', '#EDE7F6', '#E3F2FD', '#E0F7FA', '#E0F2F1', '#E8F5E9', '#FFF3E0', '#FFFDE7'];
    return colors[Math.floor(Math.random() * colors.length)];
}
