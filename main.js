window.addEventListener('beforeunload', checkDb);

let mainView = document.querySelector('.mainView');
let notesView = document.querySelector('.notes-view');
let addNoteView = document.querySelector('.addNoteView');
let titleInput = document.querySelector('input[name="title"]');
let dateInput = document.querySelector('input[name="date"]');
let timeInput = document.querySelector('input[name="time"]');
let textAreaInput = document.querySelector('textarea[name="text-area"]');
let searchInput = document.querySelector('input[type="search"]');

createTable();

let addNoteBtn = document.querySelector('#add-note');
let saveBtn = document.querySelector('#save-btn');

notesView.addEventListener('click', showNotesView);
addNoteBtn.addEventListener('click', showAddNoteView);
saveBtn.addEventListener('click', saveNote);
searchInput.addEventListener('keyup', searchNote);





function showNotesView() {
    mainView.style.display = 'flex';
    addNoteView.style.display = 'none';
}
function showAddNoteView() {
    addNoteView.style.display = 'flex';
    addNoteView.style.justifyContent = 'center';
    mainView.style.display = 'none';
}
function createTable(filterNotes = notes) {
    let text = '';
    filterNotes.forEach((note, index) => {
        text += `
        <div class="col-4 py-5">
            <div class="card" style="opacity:${note.opacity}">
                <div class="card-header text-center py-3">
                <h3>${note.title}</h3>
                </div>
                <div class="card-header calc-2 text-center py-3">
                    <div class="col-5">
                        <button class="btn btn-info disabled  form-control">${note.date}</button>
                    </div>
                    <div class="col-5">
                        <button class="btn btn-info disabled form-control">${note.time}</button>
                    </div>
                </div>
                <div class="card-body py-4">
                <p class="card-text">${note.description}</p>
                </div>
                <div class="card-footer calc-2 py-3">
                    <div class="col-5">
                        <button id="done" data-id="${index}" class="btn btn-success form-control">${note.done}</button>
                    </div>
                    <div class="col-5">
                        <button id="delete" data-id="${index}" class="btn btn-danger form-control">${note.delete}</button>
                    </div>
                </div>
            </div>
        </div>
    `
    })
    mainView.innerHTML = text;
    addEvenetListeners();
}

function saveNote() {
    notes.push({
        title: titleInput.value.toLowerCase(),
        date: dateInput.value,
        time: timeInput.value,
        description: textAreaInput.value,
        done: "Uradjeno",
        delete: "Obrisi",
        opacity: 1
    })
    titleInput.value = '';
    dateInput.value = '';
    timeInput.value = '',
    textAreaInput.value = '',
    createTable();
    showNotesView();
} 


function addEvenetListeners() {
    let doneBtns = document.querySelectorAll('#done');
    let deleteBtns = document.querySelectorAll('#delete');
    for (let i = 0; i < doneBtns.length; i++) {
        doneBtns[i].addEventListener('click', markAll);
        deleteBtns[i].addEventListener('click', deleteNote);
    }
}
function markAll() {
    let id = this.getAttribute('data-id');
    if (notes[id].opacity == '1') {
        notes[id].opacity = '0.3';
        createTable();
    } else {
        notes[id].opacity = '1';
        createTable();
    }   
}

function deleteNote() {
    let id = this.getAttribute('data-id');
    notes.splice(id, 1);
    createTable();
    showNotesView();
}

function searchNote() {
    let term = this.value.toLowerCase();
    let filterNotes = notes.filter(function (note) {
        if(note.title.indexOf(term) > -1) {
            return true
        }else {
            return false
        }
    })
   createTable(filterNotes);
}









function checkDb() {
    localStorage.notes = JSON.stringify(notes);
}