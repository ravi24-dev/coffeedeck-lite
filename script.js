function showTab(tab) {
  document.querySelectorAll('.tab').forEach(el => el.classList.add('hidden'));
  document.getElementById(tab).classList.remove('hidden');
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
  const text = document.getElementById('textInput').value;
  document.getElementById('textStats').innerText = `Words: ${text.split(/\s+/).length} | Characters: ${text.length}`;
}

// QUICK LINKS
function addLink() {
  const label = document.getElementById('linkLabel').value;
  const url = document.getElementById('linkURL').value;
  if (!label || !url) return;

  const links = JSON.parse(localStorage.getItem('quickLinks') || '[]');
  links.push({ label, url });
  localStorage.setItem('quickLinks', JSON.stringify(links));
  renderLinks();
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
});
