function initTheme() {
    const saved = localStorage.getItem('theme');
    if(saved === 'light') {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
    } else {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
    }
    updateToggleButton();
}

function updateToggleButton() {
    const btn = document.getElementById('darkModeToggle');
    if(!btn) return;
    const isLight = document.body.classList.contains('light-mode');
    btn.innerHTML = isLight ? '<i class="fas fa-moon"></i> Dark Mode' : '<i class="fas fa-sun"></i> Light Mode';
}

function toggleTheme() {
    if(document.body.classList.contains('light-mode')) {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
    }
    updateToggleButton();
}

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    const btn = document.getElementById('darkModeToggle');
    if(btn) btn.addEventListener('click', toggleTheme);
});