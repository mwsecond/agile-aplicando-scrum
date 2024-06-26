// function saveNotesToLocalStorage(notes) {
//   localStorage.setItem("notes", JSON.stringify(notes));
// }
// function getNotesFromLocalStorage() {
//   const notes = localStorage.getItem("notes");
//   return notes ? JSON.parse(notes) : [];
// }

function addNote() {
  const noteContent = document.getElementById("new-note-content").value;
  if (noteContent.trim() === "") {
    alert("A nota não pode estar vazia!");
    return;
  }

  // const notes = getNotesFromLocalStorage();
  // notes.push(noteContent);
  // saveNotesToLocalStorage(notes);

  // renderNotes();
  // document.getElementById("new-note-content").value = "";

  const notesContainer = document.getElementById("notes");
  const notesList = document.getElementById("notes-list");

  const noteElement = document.createElement("div");
  noteElement.classList.add("note");

  const noteTextarea = document.createElement("textarea");
  noteTextarea.classList.add("note-textarea");
  noteTextarea.value = noteContent;
  noteElement.appendChild(noteTextarea);

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.innerHTML = "Excluir";
  deleteButton.onclick = () => {
    notesContainer.removeChild(noteElement);
    notesList.removeChild(noteListItem);
    updateNoteList();
  };
  noteElement.appendChild(deleteButton);

  const editButton = document.createElement("button");
  editButton.classList.add("edit-button");
  editButton.innerHTML = "Editar";
  editButton.onclick = () => {
    if (editButton.innerHTML === "Editar") {
      noteTextarea.removeAttribute("readonly");
      noteTextarea.focus();
      editButton.innerHTML = "Salvar";
    } else {
      noteTextarea.setAttribute("readonly", true);
      editButton.innerHTML = "Editar";
      updateNoteList();
    }
  };
  noteElement.appendChild(editButton);

  notesContainer.appendChild(noteElement);

  const creationDate = new Date().toLocaleDateString("pt-BR");
  const creationTime = new Date().toLocaleTimeString("pt-BR");
  const creationDateTime = `Criado em: ${creationDate}, ${creationTime}`;
  const creationInfo = document.createElement("div");
  creationInfo.classList.add("creation-info");
  creationInfo.textContent = creationDateTime;
  noteElement.appendChild(creationInfo);

  const noteListItem = document.createElement("div");
  noteListItem.classList.add("note-item");
  noteListItem.textContent =
    noteContent.substring(0, 20) + (noteContent.length > 20 ? "..." : "");
  noteListItem.onclick = () => {
    noteTextarea.scrollIntoView();
  };

  const listDeleteButton = document.createElement("button");
  listDeleteButton.classList.add("delete-button");
  listDeleteButton.innerHTML = "Excluir";
  listDeleteButton.onclick = () => {
    notesContainer.removeChild(noteElement);
    notesList.removeChild(noteListItem);
    updateNoteList();
  };
  noteListItem.appendChild(listDeleteButton);

  notesList.appendChild(noteListItem);

  document.getElementById("new-note-content").value = "";
}

function updateNoteList() {
  const noteListItems = document.querySelectorAll(".note-item");
  noteListItems.forEach((item) => {
    const index = Array.from(item.parentNode.children).indexOf(item);
    const correspondingNote = document.querySelectorAll(".note")[index];
    item.textContent =
      correspondingNote.querySelector("textarea").value.substring(0, 20) +
      (correspondingNote.querySelector("textarea").value.length > 20
        ? "..."
        : "");
  });
}

document.getElementById("search-note").addEventListener("input", function () {
  const query = this.value.toLowerCase();
  const notes = document.querySelectorAll(".note");
  notes.forEach((note) => {
    const noteContent = note.querySelector("textarea").value.toLowerCase();
    const shouldBeDisplayed = noteContent.includes(query);
    note.style.display = shouldBeDisplayed ? "block" : "none";
  });

  const noteItems = document.querySelectorAll(".note-item");
  noteItems.forEach((item) => {
    const itemContent = item.textContent.toLowerCase();
    const shouldBeDisplayed = itemContent.includes(query);
    item.style.display = shouldBeDisplayed ? "block" : "none";
  });
});

// function renderNotes() {
//   const notesContainer = document.getElementById("notes");
//   notesContainer.innerHTML = ""; // Limpa as notas existentes

//   const notes = getNotesFromLocalStorage();
//   notes.forEach((noteContent) => {
//     const noteElement = document.createElement("div");
//     noteElement.classList.add("note");

//     const noteTextarea = document.createElement("textarea");
//     noteTextarea.value = noteContent;
//     noteElement.appendChild(noteTextarea);

//     notesContainer.appendChild(noteElement);
//   });
// }
// document.addEventListener("DOMContentLoaded", () => {
//   renderNotes();
// });
