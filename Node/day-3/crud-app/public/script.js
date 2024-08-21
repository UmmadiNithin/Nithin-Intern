document.addEventListener("DOMContentLoaded", () => {
    const dataTable = document.getElementById("dataTable").querySelector("tbody");
    const recordForm = document.getElementById("recordForm");
    const addRecordBtn = document.getElementById("addRecordBtn");
    const addEditForm = document.getElementById("addEditForm");
    const formTitle = document.getElementById("formTitle");
    const submitBtn = document.getElementById("submitBtn");

    let editingId = null;

    const fetchData = async () => {
        const response = await fetch('/api/users');
        const data = await response.json();
        populateTable(data);
    };

    const populateTable = (data) => {
        dataTable.innerHTML = '';
        data.forEach((user) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.age}</td>
                <td>
                    <button onclick="editRecord(${user.id})">Edit</button>
                    <button onclick="deleteRecord(${user.id})">Delete</button>
                </td>
            `;
            dataTable.appendChild(row);
        });
    };

    window.editRecord = async (id) => {
        const response = await fetch(`/api/users/${id}`);
        const user = await response.json();
        
        document.getElementById("userId").value = user.id;
        document.getElementById("name").value = user.name;
        document.getElementById("email").value = user.email;
        document.getElementById("age").value = user.age;

        editingId = id;
        formTitle.textContent = "Edit Record";
        submitBtn.textContent = "Update";
        recordForm.style.display = "block";
    };

    window.deleteRecord = async (id) => {
        await fetch(`/api/users/${id}`, { method: 'DELETE' });
        fetchData();
    };

    addRecordBtn.addEventListener("click", () => {
        editingId = null;
        document.getElementById("userId").value = '';
        document.getElementById("name").value = '';
        document.getElementById("email").value = '';
        document.getElementById("age").value = '';
        formTitle.textContent = "Add New Record";
        submitBtn.textContent = "Add";
        recordForm.style.display = "block";
    });

    addEditForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const user = {
            id: editingId || Date.now(),
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            age: document.getElementById("age").value
        };

        if (editingId) {
            await fetch(`/api/users/${user.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            });
        } else {
            await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            });
        }

        recordForm.style.display = "none";
        fetchData();
    });

    fetchData();
});
