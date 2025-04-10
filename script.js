function showTab(tabId) {
  document.querySelectorAll('.tab').forEach(tab => {
    tab.classList.add('hidden');
    tab.classList.remove('active');
  });

  const selected = document.getElementById(tabId);
  if (selected) {
    selected.classList.remove('hidden');
    selected.classList.add('active');
  }
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

// LINKS
function addLink() {
  const label = document.getElementById('linkLabel').value;
  let url = document.getElementById('linkURL').value;

  if (!label || !url) return;
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url;
  }

  const links = JSON.parse(localStorage.getItem('quickLinks') || '[]');
  links.push({ label, url });
  localStorage.setItem('quickLinks', JSON.stringify(links));
  renderLinks();
  document.getElementById('linkLabel').value = '';
  document.getElementById('linkURL').value = '';
  showToast('✅ Link added!');
}

function renderLinks() {
  const links = JSON.parse(localStorage.getItem('quickLinks') ||
