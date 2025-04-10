function showTab(tab) {
  document.querySelectorAll('.tab').forEach(el => el.classList.remove('active'));
  document.getElementById(tab).classList.add('active');
}

// TEXT TOOLS
function toUpper() {
  const input = document.getElementById('textInput');
  input.value = input.value.toUpperCase();
  updateStats();
}

function toLower() {
  const input = document.getElementById('textInput');
  input.value = input.value.toLowerCase();
  updateStats();
}

function removeDuplicates() {
  const input = document.getElementById('textInput');
  const lines = input.value.split('\n');
  const unique = [...new Set(lines)];
  input.value = unique.join('\n');
  updateStats();
}

function trimSpaces() {
  const input = document.getElementById('textInput');
  input.value = input.value.replace(/\s+/g, ' ').trim();
  updateStats();
}

function updateStats() {
  const text = document.getElementById('textInput').value.trim();
  const words = text ? text.split(/\s+/).length : 0;
  document.getElementById('textStats').innerText = `Words: ${words} | Characters: ${text.length}`;
}

// QUICK LINKS
function addLink() {
  const label = document.getElementById('linkLabel').value;
  let url = document.getElementById('linkURL').value;

  if (!label || !url) return;

  // Add https:// if missing
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url;
  }

  const links = JSON.parse(localStorage.getItem('quickLinks') || '[]');
  links.push({ label, url });
  localStorage.setItem('quickLinks', JSON.stringify(links));
  renderLinks();

  // Clear inputs (optional)
  document.getElementById('linkLabel').value = '';
  document.getElementById('linkURL').value = '';
}

function renderLinks() {
  const links = JSON.parse(localStorage.getItem('quickLinks') || '[]');
  const container = document.getElementById('linksContainer');
  container.innerHTML = '';
  links.forEach(link => {
    const btn = document.createElement('button');
    btn.innerText = link.label;
    btn.onclick = () => window.open(link.url, '_blank');
    container.appendChild(btn);
  });
}

// NOTES
function loadNotes() {
  const noteArea = document.getElementById('noteArea');
  noteArea.value = localStorage.getItem('notes') || '';
  noteArea.addEventListener('input', () => {
    localStorage.setItem('notes', noteArea.value);
  });
}

function clearNotes() {
  document.getElementById('noteArea').value = '';
  localStorage.removeItem('notes');
}

// INIT
document.addEventListener('DOMContentLoaded', () => {
  renderLinks();
  loadNotes();
  showTab('text');
  initTheme(); // Add this line at the bottom of your DOMContentLoaded block

});
function toggleTheme() {
  const body = document.body;
  const btn = document.getElementById('themeBtn');
  const isDark = body.classList.toggle('dark-mode');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  btn.innerText = isDark ? '☀️' : '🌙';
}

function initTheme() {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    document.body.classList.add('dark-mode');
    document.getElementById('themeBtn').innerText = '☀️';
  }
}
// Clears all saved quick links
function clearAllLinks() {
  localStorage.removeItem('quickLinks');
  renderLinks();
}

// Optional manual note saving (visual feedback could be added later)
function saveNotes() {
  const notes = document.getElementById('noteArea').value;
  localStorage.setItem('notes', notes);
  alert('✅ Notes saved!');
}
