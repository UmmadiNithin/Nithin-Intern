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
            event.preventDefault(); 
            searchBtn.click(); 
        }
    });

    // Priority filter functionality
    const priorityFilter = document.getElementById('priorityFilter');

    priorityFilter.addEventListener('change', () => {
        const selectedPriority = priorityFilter.value;
        
        fetchTasks(selectedPriority); 
    });
});



const todaysTasksBtn = document.getElementById('todaysTasksBtn');
console.log(todaysTasksBtn,'found button');

todaysTasksBtn.addEventListener('click', async function(event) {
    event.preventDefault(); 
    console.log('button clicked');
    
    const tasks = await fetchTasks();
    console.log("Tasks fetched:", tasks);
    
    if (tasks) {
        const todaysTasks = filterTodaysTasks(tasks);
        console.log('Today Tasks:', todaysTasks);
        const tasksContainer = document.getElementById('tasksContainer');
        tasksContainer.innerHTML = '';

        if (todaysTasks.length > 0) {
            todaysTasks.forEach(task => {
                const taskBox = createTaskBox(task);
                tasksContainer.appendChild(taskBox);
            });

            // Re-attach event listeners to edit and delete buttons
            document.querySelectorAll('.edit-btn').forEach(button => {
                button.addEventListener('click', (e) => editTask(e.target.dataset.taskId));
            });

            document.querySelectorAll('.delete-btn').forEach(button => {
                button.addEventListener('click', (e) => deleteTask(e.target.dataset.taskId));
            });
        } else {
            tasksContainer.innerHTML = '<p>No tasks found for today.</p>';
        }
    }
});


function filterTodaysTasks(tasks) {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in 'YYYY-MM-DD' format
    return tasks.filter(task => task.dueDate.split('T')[0] === today); // Ensure the date part only
}


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
                tasksContainer.innerHTML = '<p>OOPS !<br><br> No tasks found matching your search criteria.</p>';
            }

            // Re-attach event listeners to edit and delete buttons
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
    // Get the year, month, and day
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Function to set the minimum date to today for the due date field
function setMinDueDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed
    const day = String(today.getDate()).padStart(2, '0');
    
    // Format the date as YYYY-MM-DD
    const minDate = `${year}-${month}-${day}`;
    
    // Set the min attribute to today's date
    document.getElementById('taskDueDate').setAttribute('min', minDate);
}

// Call the function to set the min date when the page loads
document.addEventListener('DOMContentLoaded', setMinDueDate);

function createTaskBox(task) {
    const taskBox = document.createElement('div');
    taskBox.className = 'task-box';

    // Retrieve color from localStorage or generate a new one
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
            fetchTasks(); // Refresh task list
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

        console.log('Response status:', response.status);
        console.log('Response headers:', [...response.headers]);

        if (response.ok) {
            const tasks = await response.json();
            console.log(' display Fetched tasks:', tasks);

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

            return tasks; // Return tasks here
        } else {
            const errorText = await response.text();
            console.error('Failed to fetch tasks:', errorText);
            alert('Failed to fetch tasks: ' + errorText);
            return []; // Return an empty array in case of error
        }
    } catch (error) {
        console.error('Error fetching tasks:', error.message);
        alert('Error: ' + error.message);
        return []; // Return an empty array in case of exception
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

// Generate random background colors for task boxes
function getRandomColor() {
    const colors = [
        '#FFDFD3', // Soft Peach
        '#FFC5D0', // Baby Pink
        '#FFCCF9', // Pastel Pink
        '#E0BBE4', // Light Lavender
        '#D4C1EC', // Soft Lilac
        '#C7CEEA', // Baby Blue
        '#B3E5FC', // Pastel Sky Blue
        '#A0E7E5', // Soft Aqua
        '#B2F7EF', // Light Mint
        '#C5FAD5', // Baby Mint Green
        '#F7EEC7', // Light Yellow
        '#FFF7AE', // Pastel Yellow
        '#FFEDCC', // Baby Apricot
        '#FFE5B4', // Soft Peachy Orange
        '#FBE7C6'  // Warm Cream
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}



// Function to display user info
function displayUserInfo() {
    const username = localStorage.getItem('username');
        document.getElementById('username').textContent = username ? ` ${username}` :"welcome , Guest";
    }
