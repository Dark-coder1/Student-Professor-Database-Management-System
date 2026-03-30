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

        // Messages Page
        const msgCloseBtn = document.getElementById('messagesCloseBtn');
        if (msgCloseBtn) msgCloseBtn.onclick = () => this.closeMessagesPage();

        const sendBtn = document.getElementById('chatSendBtn');
        const chatInput = document.getElementById('chatInput');
        
        if (sendBtn) sendBtn.onclick = () => this.sendChatMessage();
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.sendChatMessage();
            });
        }
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
        const meetingType = form.querySelector('input[name="meetingType"]:checked').value;
        const meetDateTimeRaw = document.getElementById('meetDateTime').value;
        
        // Validation logic
        const meetDate = new Date(meetDateTimeRaw);
        const now = new Date();
        
        // 1. Past Date/Time
        if (meetDate < now) {
            this.showToast('Error: Cannot request a meeting in the past.', 'error');
            return;
        }
        
        // 2. Weekend Requests
        const dayOfWeek = meetDate.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            this.showToast('Error: Meetings cannot be scheduled on weekends.', 'error');
            return;
        }

        // 3. Off-Campus Status & In-Person requested
        const faculty = state.allFaculty.find(f => f.name === facultyName);
        if (faculty && meetingType === 'in-person' && faculty.campusStatus === 'off-campus') {
            this.showToast(`Error: ${facultyName} is off-campus and cannot meet in-person.`, 'error');
            return;
        }

        // 4. Unavailable Slot
        let isAvailable = false;
        if (faculty && faculty.free && faculty.free.length > 0) {
            const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            const reqDay = days[dayOfWeek];
            const reqHour = meetDate.getHours();

            for (let slot of faculty.free) {
                const dashIndex = slot.indexOf('–') !== -1 ? slot.indexOf('–') : slot.indexOf('-');
                if (dashIndex === -1) continue;
                
                const dayPart = slot.substring(0, 3);
                if (dayPart !== reqDay) continue;

                const timeString = slot.substring(4);
                const startStr = timeString.substring(0, timeString.indexOf(slot.charAt(dashIndex))).trim();
                const endStr = timeString.substring(timeString.indexOf(slot.charAt(dashIndex)) + 1).trim();

                const parseTime = (str) => {
                    let [hour, period] = str.split(" ");
                    hour = parseInt(hour, 10);
                    if (period === "PM" && hour < 12) hour += 12;
                    if (period === "AM" && hour === 12) hour = 0;
                    return hour;
                };

                const startH = parseTime(startStr);
                const endH = parseTime(endStr);

                if (reqHour >= startH && reqHour < endH) {
                    isAvailable = true;
                    break;
                }
            }
        } else {
            // If no free timings listed, we assume they are generally available but can throw a warning
            // For requirements, we'll allow it if they have no explicit free slots.
            isAvailable = true;
        }

        if (faculty && faculty.free && faculty.free.length > 0 && !isAvailable) {
            this.showToast(`Error: Time falls outside ${facultyName}'s free slots.`, 'error');
            return;
        }

        const requestData = {
            facultyName,
            type: 'Meeting',
            meetingType,
            dateTime: meetDateTimeRaw,
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
    },

    openMessagesPage(facultyName = null) {
        document.getElementById('messagesPage').classList.add('open');
        document.body.style.overflow = 'hidden';
        if (facultyName) {
            this.activeChatFaculty = facultyName;
        } else if (!this.activeChatFaculty && state.requests.length > 0) {
            this.activeChatFaculty = state.requests[0].facultyName;
        }
        if (window.renderRequestHistory) window.renderRequestHistory();
    },

    closeMessagesPage() {
        document.getElementById('messagesPage').classList.remove('open');
        document.body.style.overflow = '';
    },

    sendChatMessage() {
        const input = document.getElementById('chatInput');
        const text = input.value.trim();
        if (!text || !this.activeChatFaculty) return;

        input.value = '';

        const requestData = {
            facultyName: this.activeChatFaculty,
            type: 'Message',
            subject: 'Direct Message',
            message: text,
            isIncoming: false
        };

        api.sendRequest(requestData).then(() => {
            if (window.renderRequestHistory) window.renderRequestHistory();
        });
    }
};

window.renderRequestHistory = function() {
    interactions.renderConversationsList();
    if (interactions.activeChatFaculty) {
        interactions.renderChatWindow(interactions.activeChatFaculty);
    }
};

interactions.renderConversationsList = function() {
    const list = document.getElementById('conversationsList');
    if (!list) return;

    if (state.requests.length === 0) {
        list.innerHTML = `<div style="padding: 24px; color: var(--ink-muted); text-align: center;">No messages yet.</div>`;
        return;
    }

    const convMap = new Map();
    state.requests.forEach(req => {
        if (!convMap.has(req.facultyName)) {
            let preview = req.type === 'Message' ? (req.message || req.subject) : req.type === 'Meeting' ? 'Requested a meeting' : 'Project registration';
            convMap.set(req.facultyName, {
                facultyName: req.facultyName,
                latestTime: new Date(req.timestamp),
                preview: preview
            });
        }
    });

    const convList = Array.from(convMap.values()).sort((a,b) => b.latestTime - a.latestTime);

    list.innerHTML = convList.map(conv => {
        const isActive = interactions.activeChatFaculty === conv.facultyName ? 'active' : '';
        const facultyInfo = state.allFaculty.find(f => f.name === conv.facultyName);
        const emoji = facultyInfo ? (facultyInfo.emoji || '👤') : '👤';
        return `
            <div class="conversation-item ${isActive}" onclick="interactions.activeChatFaculty='${conv.facultyName.replace(/'/g, "\\'")}'; renderRequestHistory();">
                <div class="conv-avatar">${emoji}</div>
                <div class="conv-details">
                    <div class="conv-name">${conv.facultyName}</div>
                    <div class="conv-preview">${conv.preview}</div>
                </div>
            </div>
        `;
    }).join("");
};

interactions.renderChatWindow = function(facultyName) {
    document.getElementById('chatEmptyState').style.display = 'none';
    document.getElementById('chatHeader').style.display = 'flex';
    document.getElementById('chatHistory').style.display = 'flex';
    document.getElementById('chatInputArea').style.display = 'flex';

    document.getElementById('chatHeaderName').textContent = facultyName;
    const facultyInfo = state.allFaculty.find(f => f.name === facultyName);
    document.getElementById('chatHeaderAvatar').textContent = facultyInfo ? (facultyInfo.emoji || '👤') : '👤';

    const historyContainer = document.getElementById('chatHistory');
    
    const msgs = state.requests.filter(r => r.facultyName === facultyName).sort((a,b) => new Date(a.timestamp) - new Date(b.timestamp));
    
    historyContainer.innerHTML = msgs.map(msg => {
        const time = new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        if (msg.type === 'Message') {
            const wrapClass = msg.isIncoming ? 'incoming' : 'outgoing';
            const text = msg.message || msg.subject;
            return `
                <div class="chat-bubble-wrapper ${wrapClass}">
                    <div class="chat-bubble">${text}</div>
                    <div class="chat-time">${time}</div>
                </div>
            `;
        } else {
            const title = msg.type === 'Meeting' ? '📅 Meeting Request' : '📝 Project Registration';
            let detail = msg.type === 'Meeting' ? `Requested for: ${new Date(msg.dateTime).toLocaleString()}` : `Project: ${msg.projectTitle}`;
            if (msg.reason) detail += `<br/>Reason: ${msg.reason}`;
            const statusColor = msg.status === 'accepted' ? 'var(--forest)' : msg.status === 'rejected' ? 'var(--terracotta)' : '#666';
            const statusLabel = `<span style="text-transform:uppercase; font-size:0.7rem; padding: 2px 6px; border-radius: 4px; background: #eee; color: ${statusColor}; margin-left: 8px;">${msg.status}</span>`;
            
            return `
                <div class="chat-system-card">
                    <div class="chat-system-title" style="display:flex; justify-content:space-between; align-items:center;">
                        ${title}
                        ${statusLabel}
                    </div>
                    <div style="font-size: 0.85rem; color: var(--ink); line-height: 1.4;">${detail}</div>
                    <div class="chat-time" style="text-align:right;">${time}</div>
                </div>
            `;
        }
    }).join("");
    
    setTimeout(() => {
        historyContainer.scrollTop = historyContainer.scrollHeight;
    }, 10);
};

interactions.clearCurrentChat = function() {
    if (!this.activeChatFaculty) return;
    if (!confirm(`Are you sure you want to clear your chat history with ${this.activeChatFaculty}?`)) return;
    
    state.requests = state.requests.filter(req => req.facultyName !== this.activeChatFaculty);
    
    if (api && api._persistRequests) {
        api._persistRequests();
    }
    
    this.showToast(`Chat with ${this.activeChatFaculty} cleared.`, 'success');
    
    // If there are no more messages across the whole app, activeChatFaculty should clear.
    // If not, it can stay or switch, but renderRequestHistory handles switching if empty state.
    const remaining = state.requests.filter(req => req.facultyName === this.activeChatFaculty);
    if (remaining.length === 0) {
        // Find another faculty to switch to, or set to null
        const activeConvos = [...new Set(state.requests.map(r => r.facultyName))];
        this.activeChatFaculty = activeConvos.length > 0 ? activeConvos[0] : null;
        
        if (!this.activeChatFaculty) {
            document.getElementById('chatHeader').style.display = 'none';
            document.getElementById('chatHistory').style.display = 'none';
            document.getElementById('chatInputArea').style.display = 'none';
            document.getElementById('chatEmptyState').style.display = 'flex';
        }
    }

    if (window.renderRequestHistory) window.renderRequestHistory();
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => interactions.init());
window.interactions = interactions;
