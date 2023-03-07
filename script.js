const notes = document.querySelector('.notes');
const addNoteBtn = document.querySelector('.note-add')
let saveCreatedNotes = [];
const lastNotes = JSON.parse(localStorage.getItem('notes'));

//в данной ф-ии происходит создание заметки
function addNote (title, record) {
	const note = document.createElement('div');
	note.classList.add('note');
	note.innerHTML = `
	<div class="note-header">
		<p id="note-title">${title}</p>
		<input id='note-edit-title' class="invisible" type="text" value="${title}"></input>
		<div class="note-actions">
			<button class="note-edit"><i class="fa-solid fa-file-pen"></i></button>
			<button class="note-delete"><i class="fa-solid fa-trash"></i></button>
		</div>
	</div>
	<p id="note-record">${record}</p>
	<textarea id="note-edit-record" class="invisible" name="" id="" cols="30" rows="10">${record}</textarea>`;

	const editBtn = note.querySelector('.note-edit');
	const deleteBtn = note.querySelector('.note-delete');
	const noteTitle = note.querySelector('#note-title');
	const noteRecord = note.querySelector('#note-record');
	const noteEditTitle = note.querySelector('#note-edit-title');
	const noteEditRecord = note.querySelector('#note-edit-record');

	//появление полей редактирования заметки
	editBtn.addEventListener('click', (e) => {
		noteTitle.classList.toggle('invisible');
		noteRecord.classList.toggle('invisible');

		noteEditTitle.classList.toggle('invisible');
		noteEditRecord.classList.toggle('invisible');
	})

	//удаление заметки
	deleteBtn.addEventListener('click', (e) => {
		note.remove();
	})

	//редактирование заголовка
	noteEditTitle.addEventListener('input', (e) => {
		noteTitle.innerHTML = e.target.value;
	})
	//редактирование записи заметки
	noteEditRecord.addEventListener('input', (e) => {
		noteRecord.innerHTML = e.target.value;
	})

	return note;
}

//добавление заметки при нажатии кнопки +
addNoteBtn.addEventListener('click', (e) => {
	const newNote = addNote('Заголовок', 'Вставить текст');
	notes.appendChild(newNote);
})

//добавление заметок прошлой сессии. Если заметок не было, то добавится одна
window.addEventListener('load', (e) => {
	if(lastNotes.length == 0){
		const newNote = addNote('Заголовок', 'Вставить текст');
		notes.appendChild(newNote);
	}
	else
	{
		for(let i = 0; i < lastNotes.length; i++) {
			const newNote = addNote(lastNotes[i].header, lastNotes[i].text);
			notes.appendChild(newNote);
		}
	}
})

//сохранение всех заметок в localStorage перед закрытием
window.addEventListener('beforeunload', (e) => {
	const createdNotes = notes.querySelectorAll('.note');
	for(let i = 0; i < createdNotes.length; i++) {
		saveCreatedNotes.push({
			"header": createdNotes[i].childNodes[1].childNodes[1].innerHTML,
			"text": createdNotes[i].childNodes[3].innerHTML});
	}
	localStorage.setItem('notes', JSON.stringify(saveCreatedNotes));
})
