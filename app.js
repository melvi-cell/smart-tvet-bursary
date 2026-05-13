// Dark Mode Toggle
function initDarkMode() {
    const toggleBtn = document.getElementById('darkModeToggle');
    if(toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            document.body.classList.remove('dark-mode');
            if(document.body.classList.contains('light-mode')) {
                toggleBtn.innerHTML = '<i class="fas fa-moon"></i><span>Dark Mode</span>';
            } else {
                document.body.classList.add('dark-mode');
                toggleBtn.innerHTML = '<i class="fas fa-sun"></i><span>Light Mode</span>';
            }
            localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
        });
    }
    
    const savedTheme = localStorage.getItem('theme');
    if(savedTheme === 'light') {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
        if(toggleBtn) toggleBtn.innerHTML = '<i class="fas fa-moon"></i><span>Dark Mode</span>';
    } else {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
        if(toggleBtn) toggleBtn.innerHTML = '<i class="fas fa-sun"></i><span>Light Mode</span>';
    }
}

// Fraud Detection
function checkFraud(application) {
    let applications = JSON.parse(localStorage.getItem('applications')) || [];
    let similar = applications.filter(a => a.nationalId === application.nationalId && a.id !== application.id);
    if(similar.length > 0) return { fraudScore: 'high', reason: 'Multiple applications detected' };
    if(application.householdIncome > 500000 && application.amount > 80000) return { fraudScore: 'medium', reason: 'High income with large request' };
    return { fraudScore: 'low', reason: 'Clean' };
}

// Update Notification Badge
function updateNotificationBadge() {
    let notifications = JSON.parse(localStorage.getItem('notifications')) || [];
    let unread = notifications.filter(n => !n.read).length;
    let badge = document.getElementById('notifBadge');
    if(badge) badge.innerText = unread;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    
    // Initialize demo data if empty
    if(!localStorage.getItem('applications')) {
        let demoApps = [
            { id: 'APP-2401', fullname: 'James Mwangi', institution: 'Michuki National Poly', amount: 48000, status: 'approved', householdIncome: 250000, submittedAt: '2025-02-10' },
            { id: 'APP-2402', fullname: 'Alice Wanjiku', institution: 'Nairobi Technical', amount: 35000, status: 'pending', householdIncome: 320000, submittedAt: '2025-02-14' },
            { id: 'APP-2403', fullname: 'Brian Otieno', institution: 'Kisumu Poly', amount: 52000, status: 'pending', householdIncome: 280000, submittedAt: '2025-02-18' },
            { id: 'APP-2404', fullname: 'Julia Wangare', institution: 'Michuki National Poly', amount: 45000, status: 'approved', householdIncome: 180000, submittedAt: '2025-02-05' }
        ];
        localStorage.setItem('applications', JSON.stringify(demoApps));
    }
    if(!localStorage.getItem('applicants')) {
        localStorage.setItem('applicants', JSON.stringify([]));
    }
    if(!localStorage.getItem('notifications')) {
        localStorage.setItem('notifications', JSON.stringify([
            { id: 1, message: 'Welcome to Smart TVET Bursary System', read: false, date: '2025-01-01' }
        ]));
    }
    
    updateNotificationBadge();
});