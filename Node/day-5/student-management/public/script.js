document.addEventListener('DOMContentLoaded', () => {
    const studentTableBody = document.getElementById('studentTableBody');

    const fetchStudents = async () => {
        const response = await fetch('/students');
        const students = await response.json();

        studentTableBody.innerHTML = students.map(student => `
            <tr>
                <td>${student.registerNo}</td>
                <td>${student.name}</td>
                <td>${student.age}</td>
                <td>${student.class}</td>
                <td>${student.fathersName}</td>
                <td>${student.contactNo}</td>
                <td>
                    <button class="btn btn-warning btn-sm" data-toggle="modal" data-target="#editStudentModal" data-register-no="${student.registerNo}">Edit</button>
                    <a href="/students/delete/${student.registerNo}" class="btn btn-danger btn-sm" onclick="return confirm('Are you sure?')">Delete</a>
                    <a href="/students/download/individual/${student.registerNo}" class="btn btn-info btn-sm">Download</a>
                </td>
            </tr>
        `).join('');
    };

    fetchStudents();

    document.getElementById('addStudentForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        await fetch('/students/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        $('#addStudentModal').modal('hide');
        fetchStudents();
    });

    $('#editStudentModal').on('show.bs.modal', async (event) => {
        const button = $(event.relatedTarget);
        const registerNo = button.data('register-no');

        const response = await fetch(`/students/${registerNo}`);
        const student = await response.json();

        document.getElementById('editRegisterNo').value = student.registerNo;
        document.getElementById('editName').value = student.name;
        document.getElementById('editAge').value = student.age;
        document.getElementById('editClass').value = student.class;
        document.getElementById('editFathersName').value = student.fathersName;
        document.getElementById('editContactNo').value = student.contactNo;
    });

    document.getElementById('editStudentForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        const registerNo = data.registerNo;

        await fetch(`/students/edit/${registerNo}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        $('#editStudentModal').modal('hide');
        fetchStudents();
    });
});
