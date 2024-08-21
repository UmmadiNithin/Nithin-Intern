document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('#data-table tbody');
    const modal = document.getElementById('modal');
    const modalForm = document.getElementById('modal-form');
    const closeBtn = document.getElementById('close-btn');
    const addBtn = document.getElementById('add-btn');
    const saveBtn = document.getElementById('save-btn');
    let editingRecordId = null;

    // Fetch and display data
    const loadData = () => {
        fetch('/api/records')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then(data => {
                tableBody.innerHTML = '';
                data.forEach(record => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${record.id}</td>
                        <td>${record.name}</td>
                        <td>${record.age}</td>
                        <td>
                            <button class="edit-btn" data-id="${record.id}">Edit</button>
                            <button class="delete-btn" data-id="${record.id}">Delete</button>
                        </td>
                    `;
                    tableBody.appendChild(row);
                });
                attachEventListeners();
            })
            .catch(error => console.error('Error loading data:', error));
    };

    // Open modal
    const openModal = (record = {}) => {
        modal.style.display = 'block';
        document.getElementById('record-id').value = record.id || '';
        document.getElementById('name').value = record.name || '';
        document.getElementById('age').value = record.age || '';
        editingRecordId = record.id || null;
    };

    // Close modal
    const closeModal = () => {
        modal.style.display = 'none';
        modalForm.reset();
    };

    // Add/Edit Record
    modalForm.addEventListener('submit', event => {
        event.preventDefault();
        const id = editingRecordId ? editingRecordId : Date.now();
        const name = document.getElementById('name').value;
        const age = document.getElementById('age').value;
        const record = { id, name, age };

        const method = editingRecordId ? 'PUT' : 'POST';
        const url = editingRecordId ? `/api/records?id=${id}` : '/api/records';

        fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(record),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to save data');
                }
                return response.json();
            })
            .then(() => {
                loadData();
                closeModal();
            })
            .catch(error => console.error('Error saving data:', error));
    });

    // Delete Record
    const deleteRecord = (id) => {
        fetch(`/api/records?id=${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete data');
                }
                loadData();
            })
            .catch(error => console.error('Error deleting data:', error));
    };

    // Attach Event Listeners
    const attachEventListeners = () => {
        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', event => {
                const id = parseInt(event.target.dataset.id);
                const record = Array.from(tableBody.children).find(row => parseInt(row.children[0].textContent) === id);
                openModal({
                    id: record.children[0].textContent,
                    name: record.children[1].textContent,
                    age: record.children[2].textContent
                });
            });
        });

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', event => {
                const id = parseInt(event.target.dataset.id);
                if (confirm('Are you sure you want to delete this record?')) {
                    deleteRecord(id);
                }
            });
        });
    };

    closeBtn.addEventListener('click', closeModal);
    addBtn.addEventListener('click', () => openModal());
    window.addEventListener('click', event => {
        if (event.target === modal) closeModal();
    });

    loadData();
});
