// ========== UNIFIED THEME MANAGER ==========
// Works on ALL pages - Dark Theme Default

function initTheme() {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    
    // Apply dark theme by default (since dark-mode is default CSS class)
    if (savedTheme === 'light') {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
    } else {
        // Default: dark mode
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
        localStorage.setItem('theme', 'dark');
    }
    
    updateToggleButton();
}

function updateToggleButton() {
    const toggleBtn = document.getElementById('darkModeToggle');
    if (!toggleBtn) return;
    
    const isLightMode = document.body.classList.contains('light-mode');
    
    if (isLightMode) {
        toggleBtn.innerHTML = '<i class="fas fa-moon"></i><span>Dark Mode</span>';
    } else {
        toggleBtn.innerHTML = '<i class="fas fa-sun"></i><span>Light Mode</span>';
    }
}

function toggleTheme() {
    const isLightMode = document.body.classList.contains('light-mode');
    
    if (isLightMode) {
        // Switch to dark mode
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        // Switch to light mode
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
    }
    
    updateToggleButton();
}

// Initialize theme when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    
    // Attach toggle event to button
    const toggleBtn = document.getElementById('darkModeToggle');
    if (toggleBtn) {
        // Remove any existing listeners to avoid duplicates
        const newBtn = toggleBtn.cloneNode(true);
        toggleBtn.parentNode.replaceChild(newBtn, toggleBtn);
        newBtn.addEventListener('click', toggleTheme);
    }
});