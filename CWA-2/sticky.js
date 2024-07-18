const container = document.getElementById('container');

function createnewnotes(content = '', id = null) {
    let div = document.createElement('div');
    div.classList.add("note-row");
    if (!id) {
        id = 'note-' + new Date().getTime() + '-' + Math.floor(Math.random() * 1000);
    }
    div.id = id;
    div.draggable = true; // Make the div draggable

    let newnotehtml = `
        <div class="note-editor" contenteditable="true" id="note-editor">${content}</div>
        <div class="note-controls">
            <button class="smallbuttons" onclick="editNote('${id}')">Edit</button>
            <button class="smallbuttons" onclick="saveNote('${id}')">Save</button>
            <button class="smallbuttons" onclick="deleteNoteById('${id}')">Delete</button>
        </div>
    `;
    div.innerHTML = newnotehtml;
    container.appendChild(div);
    saveNotes();
}

function editNote(id) {
    console.log('Edit note with ID:', id);
}

function saveNote(id) {
    console.log('Save note with ID:', id);
    saveNotes();
}

function deleteNoteById(id) {
    console.log('Delete note with ID:', id);
    let note = document.getElementById(id);
    note.remove();
    saveNotes();
}

function saveNotes() {
    let notes = [];
    document.querySelectorAll('.note-row').forEach(note => {
        notes.push({
            id: note.id,
            content: note.querySelector('.note-editor').innerHTML
        });
    });
    localStorage.setItem('stickyNotes', JSON.stringify(notes));
}

function loadNotes() {
    let notes = JSON.parse(localStorage.getItem('stickyNotes') || '[]');
    notes.forEach(note => {
        createnewnotes(note.content, note.id);
    });
}

window.onload = loadNotes;

var a = document.getElementsByTagName('div');
var boxes = document.getElementsByClassName('note-editor');
var dragitem = null;
var h = document.getElementById('h');

for (let i of a) {
    i.addEventListener('dragstart', dragstart);
    i.addEventListener('dragend', dragend);
}

function dragstart() {
    dragitem = this;
    setTimeout(() => this.style.display = "none", 0);
}

function dragend() {
    setTimeout(() => this.style.display = "block", 0);
    dragitem = null;
}

for (let b of boxes) {
    b.addEventListener('dragover', dragover);
    b.addEventListener('dragenter', dragenter);
    b.addEventListener('dragleave', dragleave);
    b.addEventListener('drop', drop);
}

function dragover(e) {
    e.preventDefault();
    h.innerHTML = 'dragging...';
    h.style.color = 'red';
}

function dragenter(e) {
    e.preventDefault();
}

function dragleave() {
}

function drop() {
    this.append(dragitem);
    h.innerHTML = 'dropped';
    h.style.color = 'blue';
}
