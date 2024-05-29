function addNote() {
  const noteContent = document.getElementById("new-note-content").value;
  if (noteContent.trim() === "") {
    alert("A nota não pode estar vazia!");
    return;
  }

  const notesContainer = document.getElementById("notes");
  const notesList = document.getElementById("notes-list");

  const noteElement = document.createElement("div");
  noteElement.classList.add("note");

  const noteTextarea = document.createElement("textarea");
  noteTextarea.value = noteContent;
  noteElement.appendChild(noteTextarea);

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.innerHTML = "&times;";
  deleteButton.onclick = () => {
    notesContainer.removeChild(noteElement);
    notesList.removeChild(noteListItem);
  };
  noteElement.appendChild(deleteButton);

  notesContainer.appendChild(noteElement);

  const noteListItem = document.createElement("div");
  noteListItem.classList.add("note-item");
  noteListItem.textContent =
    noteContent.substring(0, 20) + (noteContent.length > 20 ? "..." : "");
  noteListItem.onclick = () => {
    noteTextarea.scrollIntoView();
  };
  notesList.appendChild(noteListItem);

  document.getElementById("new-note-content").value = "";
}

document.getElementById("search-note").addEventListener("input", function () {
  const query = this.value.toLowerCase();
  const notes = document.querySelectorAll(".note");
  notes.forEach((note) => {
    const noteContent = note.querySelector("textarea").value.toLowerCase();
    note.style.display = noteContent.includes(query) ? "block" : "none";
  });

  const noteItems = document.querySelectorAll(".note-item");
  noteItems.forEach((item) => {
    const itemContent = item.textContent.toLowerCase();
    item.style.display = itemContent.includes(query) ? "block" : "none";
  });
});
