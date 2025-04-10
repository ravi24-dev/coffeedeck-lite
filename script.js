function showTab(tabId) {
  document.querySelectorAll('.tab').forEach(tab => {
    tab.classList.remove('active');
    tab.classList.add('hidden');
  });

  const activeTab = document.getElementById(tabId);
  activeTab.classList.remove('hidden');
  activeTab.classList.add('active');
}


// === TEXT TOOLS ===
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

// === QUICK LINKS ===
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

function clearAllLinks() {
  localStorage.removeItem('quickLinks');
  renderLinks();
  showToast('🧹 All links cleared!');
}

// === NOTES ===
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
  showToast('🗑 Notes cleared!');
}

function saveNotes() {
  const notes = document.getElementById('noteArea').value;
  localStorage.setItem('notes', notes);
  showToast('✅ Notes saved!');
}

// === DARK MODE ===
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

// === TOAST SYSTEM ===
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.innerText = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

// === PDF EXTRACT ===
document.addEventListener('change', function (e) {
  if (e.target.id === 'pdfFile') {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function () {
      const typedarray = new Uint8Array(this.result);
      pdfjsLib.getDocument(typedarray).promise.then(pdf => {
        let text = '';
        const maxPages = pdf.numPages;
        let count = 0;

        for (let i = 1; i <= maxPages; i++) {
          pdf.getPage(i).then(page => {
            page.getTextContent().then(content => {
              content.items.forEach(item => text += item.str + ' ');
              count++;
              if (count === maxPages) {
                document.getElementById('pdfOutput').value = text.trim();
                showToast('📄 PDF text extracted!');
              }
            });
          });
        }
      });
    };
    reader.readAsArrayBuffer(file);
  }
});

// === INIT ===
document.addEventListener('DOMContentLoaded', () => {
  renderLinks();
  loadNotes();
  showTab('text');
  initTheme();
});
