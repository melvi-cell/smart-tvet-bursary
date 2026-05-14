// Mobile Responsive Enhancements
(function() {
    // Set viewport height for mobile browsers
    function setVH() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    setVH();
    window.addEventListener('resize', setVH);
    
    // Close sidebar on navigation (mobile)
    function setupMobileNavigation() {
        const navLinks = document.querySelectorAll('.nav-menu a');
        const sidebar = document.querySelector('.sidebar');
        const overlay = document.querySelector('.mobile-overlay');
        
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if(window.innerWidth <= 768) {
                    sidebar?.classList.remove('active');
                    overlay?.classList.remove('active');
                }
            });
        });
    }
    
    // Touch-friendly improvements
    function setupTouchOptimizations() {
        // Add active state for touch
        const buttons = document.querySelectorAll('button, .action-card, .nav-menu a');
        buttons.forEach(btn => {
            btn.addEventListener('touchstart', function() {
                this.style.opacity = '0.7';
            });
            btn.addEventListener('touchend', function() {
                this.style.opacity = '1';
            });
            btn.addEventListener('touchcancel', function() {
                this.style.opacity = '1';
            });
        });
        
        // Improve form input on mobile
        const inputs = document.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                setTimeout(() => {
                    this.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
            });
        });
    }
    
    // Toast notification for mobile
    window.showToast = function(message, type = 'info') {
        let toast = document.getElementById('mobileToast');
        if(!toast) {
            toast = document.createElement('div');
            toast.id = 'mobileToast';
            toast.style.cssText = `
                position: fixed;
                bottom: 20px;
                left: 20px;
                right: 20px;
                background: ${type === 'error' ? '#ef4444' : type === 'success' ? '#10b981' : '#1e5a8a'};
                color: white;
                padding: 12px 16px;
                border-radius: 12px;
                font-size: 14px;
                z-index: 10000;
                text-align: center;
                animation: slideUp 0.3s ease;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            `;
            document.body.appendChild(toast);
            
            // Add animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes slideUp {
                    from { transform: translateY(100px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                @keyframes slideDown {
                    from { transform: translateY(0); opacity: 1; }
                    to { transform: translateY(100px); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        toast.textContent = message;
        toast.style.display = 'block';
        toast.style.animation = 'slideUp 0.3s ease';
        
        setTimeout(() => {
            toast.style.animation = 'slideDown 0.3s ease';
            setTimeout(() => {
                toast.style.display = 'none';
            }, 300);
        }, 3000);
    };
    
    // Pull to refresh
    let touchStartY = 0;
    let isRefreshing = false;
    
    function setupPullToRefresh() {
        const mainContent = document.querySelector('.main-content');
        if(!mainContent) return;
        
        let refreshIndicator = document.createElement('div');
        refreshIndicator.id = 'refreshIndicator';
        refreshIndicator.style.cssText = `
            text-align: center;
            padding: 10px;
            color: var(--accent-orange);
            font-size: 12px;
            transform: translateY(-50px);
            transition: transform 0.3s;
        `;
        refreshIndicator.innerHTML = '<i class="fas fa-arrow-down"></i> Pull to refresh';
        mainContent.insertBefore(refreshIndicator, mainContent.firstChild);
        
        mainContent.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
        });
        
        mainContent.addEventListener('touchmove', (e) => {
            if(mainContent.scrollTop === 0 && e.touches[0].clientY > touchStartY + 50) {
                refreshIndicator.style.transform = 'translateY(0)';
                refreshIndicator.innerHTML = '<i class="fas fa-spinner fa-pulse"></i> Refreshing...';
                isRefreshing = true;
            }
        });
        
        mainContent.addEventListener('touchend', () => {
            if(isRefreshing) {
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            }
            setTimeout(() => {
                refreshIndicator.style.transform = 'translateY(-50px)';
                refreshIndicator.innerHTML = '<i class="fas fa-arrow-down"></i> Pull to refresh';
                isRefreshing = false;
            }, 200);
        });
    }
    
    // Initialize when DOM ready
    document.addEventListener('DOMContentLoaded', () => {
        setupMobileNavigation();
        setupTouchOptimizations();
        setupPullToRefresh();
        
        // Add mobile viewport class
        if(window.innerWidth <= 768) {
            document.body.classList.add('mobile-view');
        }
        
        window.addEventListener('resize', () => {
            if(window.innerWidth <= 768) {
                document.body.classList.add('mobile-view');
            } else {
                document.body.classList.remove('mobile-view');
                document.querySelector('.sidebar')?.classList.remove('active');
                document.querySelector('.mobile-overlay')?.classList.remove('active');
            }
        });
    });
})();