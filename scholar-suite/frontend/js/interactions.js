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
        
        // Simulate API call
        console.log("Submitting meeting request...", new FormData(form));
        
        this.showToast(`Meeting request sent to Dr. ${facultyName}!`, 'success');
        this.closeModal('meetingModal');
        form.reset();
    },

    /** Handle Message Form Submission */
    submitMessage(event) {
        event.preventDefault();
        const form = event.target;
        
        // Simulate API call
        console.log("Sending message...", new FormData(form));

        this.showToast('Message sent successfully!', 'success');
        this.closeModal('messageModal');
        form.reset();
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

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => interactions.init());
