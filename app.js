function saveNote() {
  const note = document.getElementById('note').value;
  if (!note) return;
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes.push({ text: note, date: new Date().toISOString() });
  localStorage.setItem('notes', JSON.stringify(notes));
  document.getElementById('note').value = '';
  displayNotes();
}

function displayNotes() {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  const container = document.getElementById('saved-notes');
  container.innerHTML = '<h2>Saved Notes:</h2>';
  notes.forEach((note, index) => {
    container.innerHTML += `
      <div>
        <p>${note.text}</p>
        <small>${new Date(note.date).toLocaleString()}</small>
        <button onclick="deleteNote(${index})">Delete</button>
        <hr>
      </div>
    `;
  });
}

function deleteNote(index) {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes.splice(index, 1);
  localStorage.setItem('notes', JSON.stringify(notes));
  displayNotes();
}

window.onload = displayNotes;

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then((reg) => {
    reg.onupdatefound = () => {
      const newSW = reg.installing;
      newSW.onstatechange = () => {
        if (newSW.state === 'installed') {
          if (navigator.serviceWorker.controller) {
            // There's a new version available
            const reloadBanner = document.createElement('div');
            reloadBanner.innerHTML = `
              <div style="background:#222; color:#fff; padding:10px; text-align:center;">
                ?? A new version is available. <button onclick="location.reload()">Reload</button>
              </div>`;
            document.body.appendChild(reloadBanner);
          } else {
            console.log('Service Worker installed for first time.');
          }
        }
      };
    };
  });
}

