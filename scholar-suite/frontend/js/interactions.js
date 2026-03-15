/**
 * interactions.js — Handles Meeting Requests, Messaging, and Toast Notifications.
 */

const interactions = {
    /** Initialize interaction event listeners */
    init() {
        this.toastContainer = document.getElementById('toastContainer');
        this.setupModals();
    },

    /** Setup modal open/close logic */
    setupModals() {
        // Close modals when clicking overlay or close button
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.onclick = (e) => {
                if (e.target === overlay) this.closeModal(overlay.id);
            };
        });

        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.onclick = () => {
                const modal = btn.closest('.modal-overlay');
                if (modal) this.closeModal(modal.id);
            };
        });
    },

    /** Open a specific modal */
    openModal(modalId, facultyName) {
        const modal = document.getElementById(modalId);
        if (!modal) return;

        // Set faculty name in titles if applicable
        const nameSpans = modal.querySelectorAll('.faculty-name-placeholder');
        nameSpans.forEach(span => span.textContent = facultyName);

        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    },

    /** Close a specific modal */
    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    },

    /** Handle Meeting Request Form Submission */
    submitMeetingRequest(event) {
        event.preventDefault();
        const form = event.target;
        const facultyName = form.querySelector('.faculty-name-placeholder').textContent;
        
        const requestData = {
            facultyName,
            type: 'Meeting',
            meetingType: form.querySelector('input[name="meetingType"]:checked').value,
            dateTime: document.getElementById('meetDateTime').value,
            reason: document.getElementById('meetReason').value,
            notes: document.getElementById('meetNotes').value
        };

        api.sendRequest(requestData).then(() => {
            this.showToast(`Meeting request sent to ${facultyName}! It will be reviewed soon.`, 'success');
            this.closeModal('meetingModal');
            form.reset();
            if (window.renderRequestHistory) renderRequestHistory();
        });
    },

    /** Handle Message Form Submission */
    submitMessage(event) {
        event.preventDefault();
        const form = event.target;
        const facultyName = form.querySelector('.faculty-name-placeholder').textContent;
        
        const requestData = {
            facultyName,
            type: 'Message',
            subject: document.getElementById('msgSubject').value,
            message: document.getElementById('msgContent').value
        };

        api.sendRequest(requestData).then(() => {
            this.showToast('Message sent successfully!', 'success');
            this.closeModal('messageModal');
            form.reset();
            if (window.renderRequestHistory) renderRequestHistory();
        });
    },

    /** Show a toast notification */
    showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>${message}</span>
        `;
        
        this.toastContainer.appendChild(toast);
        
        // Trigger animation
        setTimeout(() => toast.classList.add('visible'), 10);
        
        // Remove toast after 4 seconds
        setTimeout(() => {
            toast.classList.remove('visible');
            setTimeout(() => toast.remove(), 400);
        }, 4000);
    }
};

/** Render the request history sidebar. */
function renderRequestHistory() {
    const list = document.getElementById('requestsList');
    if (!list) return;

    if (state.requests.length === 0) {
        list.innerHTML = `
            <div class="empty-history" style="padding-top:60px;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="48" height="48" style="margin-bottom:16px; opacity:0.3;">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                <p>No past requests found.</p>
            </div>`;
        return;
    }

    list.innerHTML = state.requests.map(req => {
        const date = new Date(req.timestamp).toLocaleDateString([], { month:'short', day:'numeric', hour:'2-digit', minute:'2-digit' });
        const typeLabel = req.type === 'Meeting' ? '📅 Meeting' : '✉️ Message';
        
        return `
            <div class="history-item request-item status-${req.status}">
                <div class="history-info">
                    <div class="history-name">${req.facultyName} <span class="req-status-pill">${req.status}</span></div>
                    <div class="history-subject">${typeLabel} · ${date}</div>
                    ${req.type === 'Message' 
                        ? `<div class="req-preview">Subject: ${req.subject}</div>` 
                        : `<div class="req-preview">Scheduled: ${new Date(req.dateTime).toLocaleString()}</div>`}
                </div>
            </div>
        `;
    }).join('');
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => interactions.init());
