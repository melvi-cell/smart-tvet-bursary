// Notification System
(function() {
    // Request notification permission
    async function requestNotificationPermission() {
        if ('Notification' in window) {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                console.log('Notification permission granted');
                return true;
            }
        }
        return false;
    }
    
    // Send browser notification
    function sendBrowserNotification(title, body, icon = '/favicon.ico') {
        if ('Notification' in window && Notification.permission === 'granted') {
            const notification = new Notification(title, {
                body: body,
                icon: icon,
                badge: icon,
                vibrate: [200, 100, 200],
                silent: false
            });
            
            notification.onclick = function() {
                window.focus();
                notification.close();
            };
            
            setTimeout(() => notification.close(), 5000);
        }
    }
    
    // Load notifications for current user
    function loadNotifications() {
        const currentUser = JSON.parse(localStorage.getItem('currentApplicant'));
        if(!currentUser) return [];
        
        let notifications = JSON.parse(localStorage.getItem('notifications')) || [];
        const userNotifications = notifications.filter(n => n.userId === (currentUser.email || currentUser.uid));
        
        // Update badge count
        const unreadCount = userNotifications.filter(n => !n.read).length;
        const badge = document.getElementById('notifCount');
        if(badge) {
            badge.textContent = unreadCount;
            badge.style.display = unreadCount > 0 ? 'flex' : 'none';
        }
        
        return userNotifications;
    }
    
    // Mark notification as read
    function markAsRead(notificationId) {
        let notifications = JSON.parse(localStorage.getItem('notifications')) || [];
        const index = notifications.findIndex(n => n.id == notificationId);
        if(index !== -1) {
            notifications[index].read = true;
            localStorage.setItem('notifications', JSON.stringify(notifications));
            loadNotifications(); // Refresh badge
        }
    }
    
    // Mark all as read
    function markAllAsRead() {
        const currentUser = JSON.parse(localStorage.getItem('currentApplicant'));
        if(!currentUser) return;
        
        let notifications = JSON.parse(localStorage.getItem('notifications')) || [];
        notifications = notifications.map(n => {
            if(n.userId === (currentUser.email || currentUser.uid)) {
                n.read = true;
            }
            return n;
        });
        localStorage.setItem('notifications', JSON.stringify(notifications));
        loadNotifications(); // Refresh badge
        
        const dropdown = document.getElementById('notificationsDropdown');
        if(dropdown) renderNotificationsDropdown();
    }
    
    // Render notifications dropdown
    function renderNotificationsDropdown() {
        const userNotifications = loadNotifications();
        const dropdown = document.getElementById('notificationsDropdown');
        const notifList = document.getElementById('notificationList');
        
        if(!dropdown || !notifList) return;
        
        if(userNotifications.length === 0) {
            notifList.innerHTML = '<div class="notification-empty">No notifications yet</div>';
        } else {
            notifList.innerHTML = userNotifications.slice(0, 20).map(n => `
                <div class="notification-item ${n.read ? 'read' : 'unread'}" data-id="${n.id}" onclick="markNotificationAsRead(${n.id})">
                    <div class="notification-icon">
                        <i class="fas ${n.type === 'status' ? 'fa-chart-line' : n.type === 'welcome' ? 'fa-smile' : n.type === 'login' ? 'fa-sign-in-alt' : 'fa-bell'}"></i>
                    </div>
                    <div class="notification-content">
                        <div class="notification-message">${escapeHtml(n.message)}</div>
                        <div class="notification-time">${formatTimeAgo(n.createdAt)}</div>
                    </div>
                </div>
            `).join('');
        }
        
        // Update footer
        const footer = dropdown.querySelector('.notification-footer');
        if(footer && userNotifications.length > 0) {
            footer.style.display = 'flex';
        } else if(footer) {
            footer.style.display = 'none';
        }
    }
    
    // Helper functions
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    function formatTimeAgo(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000);
        
        if(seconds < 60) return 'Just now';
        const minutes = Math.floor(seconds / 60);
        if(minutes < 60) return `${minutes} min ago`;
        const hours = Math.floor(minutes / 60);
        if(hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        const days = Math.floor(hours / 24);
        if(days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
        return date.toLocaleDateString();
    }
    
    // Show notification dropdown
    function toggleNotifications() {
        const dropdown = document.getElementById('notificationsDropdown');
        if(dropdown) {
            dropdown.classList.toggle('show');
            if(dropdown.classList.contains('show')) {
                renderNotificationsDropdown();
            }
        }
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        const dropdown = document.getElementById('notificationsDropdown');
        const bell = document.querySelector('.notification-bell');
        if(dropdown && bell && !bell.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.remove('show');
        }
    });
    
    // Add status update notification
    window.addStatusNotification = function(userId, applicationId, status, message) {
        const notificationMsg = `Application ${applicationId} is now ${status.toUpperCase()}: ${message || ''}`;
        addSystemNotification(userId, 'status', notificationMsg);
        
        // Send browser notification if permission granted
        const currentUser = JSON.parse(localStorage.getItem('currentApplicant'));
        if(currentUser && (currentUser.email === userId || currentUser.uid === userId)) {
            sendBrowserNotification('Application Status Update', notificationMsg);
        }
    };
    
    // Add system notification
    window.addSystemNotification = function(userId, type, message) {
        let notifications = JSON.parse(localStorage.getItem('notifications')) || [];
        notifications.unshift({
            id: Date.now(),
            userId: userId,
            type: type,
            message: message,
            read: false,
            createdAt: new Date().toISOString()
        });
        
        // Keep only last 100
        if(notifications.length > 100) notifications = notifications.slice(0, 100);
        localStorage.setItem('notifications', JSON.stringify(notifications));
        
        // Refresh if on page
        renderNotificationsDropdown();
        loadNotifications();
        
        // Show toast
        if(window.showToast) {
            window.showToast(message, type === 'status' ? 'info' : 'success');
        }
    };
    
    // Request permission on page load
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            requestNotificationPermission();
        }, 2000);
        
        // Add notification bell to dashboard if not exists
        const topBar = document.querySelector('.top-bar');
        if(topBar && !document.querySelector('.notification-bell')) {
            const bellHtml = `
                <div class="notification-bell" onclick="toggleNotifications()">
                    <i class="fas fa-bell"></i>
                    <span class="badge" id="notifCount" style="display: none;">0</span>
                    <div class="notifications-dropdown" id="notificationsDropdown">
                        <div class="notification-header">
                            <h4>Notifications</h4>
                            <button onclick="markAllAsRead()" class="mark-read-btn">Mark all read</button>
                        </div>
                        <div class="notification-list" id="notificationList"></div>
                        <div class="notification-footer">
                            <a href="notifications.html">View all</a>
                        </div>
                    </div>
                </div>
            `;
            topBar.insertAdjacentHTML('beforeend', bellHtml);
        }
        
        loadNotifications();
    });
    
    // Expose functions globally
    window.requestNotificationPermission = requestNotificationPermission;
    window.sendBrowserNotification = sendBrowserNotification;
    window.loadNotifications = loadNotifications;
    window.markAsRead = markAsRead;
    window.markAllAsRead = markAllAsRead;
    window.toggleNotifications = toggleNotifications;
    window.markNotificationAsRead = markAsRead;
})();