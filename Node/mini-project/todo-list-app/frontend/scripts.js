document.addEventListener('DOMContentLoaded', () => {
    fetchTasks(); 
    displayUserInfo();
    

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

 
    // Priority filter functionality
    const priorityFilter = document.getElementById('priorityFilter');
    console.log(priorityFilter);
    
    priorityFilter.addEventListener('change', () => {
        const selectedPriority = priorityFilter.value;
        console.log(selectedPriority);
        
        fetchTasks(selectedPriority); 
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
            tasksContainer.innerHTML = ''; 

        
            if (exactMatch) {
                const taskBox = createTaskBox(exactMatch);
                tasksContainer.appendChild(taskBox);
            }

            
            relatedTasks.forEach(task => {
                const taskBox = createTaskBox(task);
                tasksContainer.appendChild(taskBox);
            });

            if (!exactMatch && relatedTasks.length === 0) {
                tasksContainer.innerHTML = '<p>OOPS !<br><br> No tasks found matching your search criteria.</p>';
            }

            document.querySelectorAll('.edit-btn').forEach(button => {
                button.addEventListener('click', (e) => editTask(e.target.dataset.taskId));
            });

            document.querySelectorAll('.delete-btn').forEach(button => {
                button.addEventListener('click', (e) => deleteTask(e.target.dataset.taskId));
            });

        } else {
            alert('Failed to search tasks: ' + await response.text());
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}


function setMinDueDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const day = String(today.getDate()).padStart(2, '0');
    
    const minDate = `${year}-${month}-${day}`;
    
    document.getElementById('taskDueDate').setAttribute('min', minDate);
}

document.addEventListener('DOMContentLoaded', setMinDueDate);

function createTaskBox(task) {
    const taskBox = document.createElement('div');
    taskBox.className = 'task-box';

   
    let taskColor = localStorage.getItem(`taskColor_${task.id}`);
    if (!taskColor) {
        taskColor = getRandomColor();
        localStorage.setItem(`taskColor_${task.id}`, taskColor);
    }
    
    taskBox.style.backgroundColor = taskColor;
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
            <span class="value">${formatDate(task.dueDate)}</span>
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
    window.location.href = 'index.html';
});

// Fetch and display tasks
async function fetchTasks(priority = '') {
    const token = localStorage.getItem('authToken');
    if (!token) return alert('You are not logged in!');

    let url = 'http://localhost:3000/api/tasks/tasks';
    if (priority) {
        url += `?priority=${encodeURIComponent(priority)}`;
    }
    console.log(priority);
    console.log(url);
    
    

    try {
        const response = await fetch(url, {
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
                const taskBox = createTaskBox(task);
                tasksContainer.appendChild(taskBox);
            });
            
            // Attach event listeners to buttons
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
                fetchTasks(); // Refresh task list
            } else {
                alert('Failed to delete task: ' + await response.text());
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    }
}

// Function to edit a task
async function editTask(taskId) {
    const token = localStorage.getItem('authToken');
    if (!token) return alert('You are not logged in!');

    try {
        const response = await fetch(`http://localhost:3000/api/tasks/singletask/${taskId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const task = await response.json();
            modal.style.display = 'block';
            document.getElementById('taskTitle').value = task.title;
            document.getElementById('taskDescription').value = task.description;
            document.getElementById('taskStatus').value = task.status;
            document.getElementById('taskDueDate').value = task.dueDate;
            document.getElementById('taskPriority').value = task.priority;
            document.getElementById('taskId').value = task.id;
            isEditing = true;
            editingTaskId = task.id;
        } else {
            alert('Failed to fetch task details: ' + await response.text());
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}


function getRandomColor() {
    const colors = [
        '#FFDFD3', 
        '#FFC5D0', 
        '#FFCCF9', 
        '#E0BBE4', 
        '#D4C1EC', 
        '#C7CEEA', 
        '#B3E5FC', 
        '#A0E7E5', 
        '#B2F7EF', 
        '#C5FAD5', 
        '#F7EEC7', 
        '#FFF7AE', 
        '#FFEDCC', 
        '#FFE5B4',
        '#FBE7C6'  
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}



function displayUserInfo() {
    const username = localStorage.getItem('username');
        document.getElementById('username').textContent = username ? ` ${username}` :"welcome , Guest";
    }

