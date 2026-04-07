let lib;
let currentChat = null;
let currentUser = null;

async function loadLib() {
  const res = await fetch('/src/db/lib.json');
  lib = await res.json();
  const chatSelect = document.getElementById('chatSelect');
  lib.chats.forEach(chat => {
    const opt = document.createElement('option');
    opt.value = chat;
    opt.textContent = chat;
    chatSelect.appendChild(opt);
  });
  chatSelect.onchange = () => loadChat(chatSelect.value);
  loadUsers();
}

function loadUsers() {
  const userSelect = document.getElementById('userSelect');
  lib.personen.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p[0];
    opt.textContent = p[0];
    userSelect.appendChild(opt);
  });
  userSelect.onchange = () => {
    currentUser = userSelect.value;
    renderMessages();
  };
}

async function loadChat(chatName) {
  const res = await fetch(`/src/db/${chatName}.json`);
  currentChat = await res.json();
  renderMessages();
}

function getProfile(name) {
  const p = lib.personen.find(x => x[0] === name);
  return p ? p[1] : '';
}

function renderMessages() {
  const container = document.getElementById('messages');
  container.innerHTML = '';
  if (!currentChat) return;
  currentChat.messages.forEach(msg => {
    const div = document.createElement('div');
    div.classList.add('msg');
    if (msg.from === currentUser) {
      div.classList.add('self');
    } else {
      div.classList.add('left');
    }
    const img = document.createElement('img');
    img.src = getProfile(msg.from);
    const text = document.createElement('div');
    text.innerHTML = `<b>${msg.from}</b><br>${msg.text}<br><small>${msg.time}</small>`;
    div.appendChild(img);
    div.appendChild(text);
    container.appendChild(div);
  });
}

loadLib();
