document.addEventListener('DOMContentLoaded', () => {
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
});

const ModernAlert = (() => {
    const icons = {
        success: 'check-circle',
        error: 'alert-circle',
        warning: 'alert-triangle',
        info: 'info'
    };

    let alertCounter = 0;

    function initContainer() {
        let container = document.getElementById('alertContainer');
        if (!container) {
            container = document.createElement('div');
            container.className = 'modern-alert-container';
            container.id = 'alertContainer';
            document.body.appendChild(container);
        }
        return container;
    }

    function show({ type = 'info', title = 'Alert', message = '', duration = 5000 }) {
        const container = initContainer();
        const alertId = `alert-${alertCounter++}`;

        const alert = document.createElement('div');
        alert.className = `modern-alert modern-alert-${type}`;
        alert.id = alertId;

        alert.innerHTML = `
            <div class="modern-alert-icon">
                <i data-feather="${icons[type] || 'info'}"></i>
            </div>
            <div class="modern-alert-content">
                <div class="modern-alert-title">${title}</div>
                <div class="modern-alert-message">${message}</div>
            </div>
            <button class="modern-alert-close" onclick="ModernAlert.close('${alertId}')">
                <i data-feather="x"></i>
            </button>
            <div class="modern-alert-progress"></div>
        `;

        container.appendChild(alert);
        if (typeof feather !== 'undefined') {
            feather.replace();
        }

        setTimeout(() => {
            alert.classList.add('show');
            const progress = alert.querySelector('.modern-alert-progress');
            progress.style.transition = `transform ${duration / 1000}s linear`;
            progress.style.transform = 'scaleX(1)';
            setTimeout(() => close(alertId), duration);
        }, 10);
    }

    function close(alertId) {
        const alert = document.getElementById(alertId);
        if (alert) {
            alert.classList.remove('show');
            setTimeout(() => alert.remove(), 500);
        }
    }

    return { show, close };
})();



function redirectWithAlert(url, message) {
    ModernAlert.show({
        type: 'info',
        title: 'Redirecting...',
        message: 'Kamu akan diarahkan dalam 2 detik',
        duration: 2000
    });

    setTimeout(() => {
        window.location.href = url;
    }, 2000);
}