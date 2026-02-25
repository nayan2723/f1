import { f1Auth as auth, f1Db as db, f1Doc as doc, f1SetDoc as setDoc, f1GetDoc as getDoc } from './lib/firebase.js';
import { authService } from './lib/authService.js';
import { syncPersonalizationState, openTeamModal } from './lib/personalization.js';

// Legacy Auth Modal DOM getters removed.

// Wait for inline rendering to finish injecting the container
document.addEventListener('DOMContentLoaded', () => {
    // Render Navbar State
    authService.initAuthListener(async (user) => {
        const navAuthContainer = document.getElementById('nav-auth-container');
        if (navAuthContainer) {
            if (user) {
                const displayName = user.displayName || 'Fan';
                const initial = (user.displayName || user.email || 'U')[0].toUpperCase();
                navAuthContainer.innerHTML = `
              <div class="user-profile">
                <span class="nav-user-name">${displayName}</span>
                <div class="user-avatar">${initial}</div>
                <div class="user-dropdown">
                  <div class="user-info">
                    <span class="user-name">${displayName}</span>
                    <span class="user-email">${user.email}</span>
                  </div>
                  <a href="#" class="dropdown-item" id="btn-settings">Favorite Team</a>
                  <a href="#" class="dropdown-item" id="btn-logout">Sign Out</a>
                </div>
              </div>
            `;
                document.getElementById('btn-logout').addEventListener('click', (e) => {
                    e.preventDefault();
                    syncPersonalizationState(null);
                    authService.logout();
                });
                document.getElementById('btn-settings').addEventListener('click', (e) => {
                    e.preventDefault();
                    openTeamModal();
                });

                // Hand over UI accent synchronization parsing to Personalization Module
                await syncPersonalizationState(user);
            } else {
                navAuthContainer.innerHTML = `<button class="btn-primary btn-sm" id="btn-login-modal">Login / Sign Up</button>`;
                document.getElementById('btn-login-modal').addEventListener('click', openModal);
                syncPersonalizationState(null);
            }
        }
    });
});

// ─────────────────────────────────────────────────────────
// NOTIFICATION SYSTEM BINDINGS (PHASE 6)
// ─────────────────────────────────────────────────────────

let unreadCount = 0;
let notifications = [];

const renderNotifications = () => {
    const notifContainer = document.getElementById('nav-notifications-container');
    if (!notifContainer) return;

    const bellHTML = `
        <div class="bell-icon">🔔
          ${unreadCount > 0 ? `<div class="bell-badge">${unreadCount}</div>` : ''}
        </div>
        <div class="notification-dropdown">
          <div class="notif-header">
            <h4>Alerts</h4>
            ${unreadCount > 0 ? `<a href="#" id="mark-all-read">Mark all as read</a>` : ''}
          </div>
          <div class="notif-list">
            ${notifications.length === 0
            ? `<div class="notif-empty">No new notifications</div>`
            : notifications.map(n => `
                  <div class="notif-item ${n.read ? '' : 'unread'}" data-id="${n.id}">
                    <div class="notif-icon">${n.type === 'race' ? '🏁' : n.type === 'breaking' ? '⚠️' : '📊'}</div>
                    <div class="notif-content">
                      <p>${n.message}</p>
                      <span class="notif-time">${new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                `).join('')
        }
          </div>
        </div>
      `;
    notifContainer.innerHTML = bellHTML;

    const markAll = document.getElementById('mark-all-read');
    if (markAll) {
        markAll.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();
            notifications.forEach(n => n.read = true);
            unreadCount = 0;

            if (auth.currentUser) {
                // Write to Firestore sequentially
                try {
                    await setDoc(doc(db, 'notifications', auth.currentUser.uid), { items: notifications });
                } catch (e) { }
            }
            renderNotifications();
        });
    }
};

const attachNotificationListener = (user) => {
    // Simulate static feed for anonymous, async sync for logged in
    if (!user) {
        notifications = [
            { id: 1, type: 'breaking', message: 'Verstappen announces shock 2027 move to Mercedes.', read: false, timestamp: new Date().getTime() - 1000000 },
            { id: 2, type: 'race', message: 'Australian GP Free Practice 1 begins in 2 hours.', read: false, timestamp: new Date().getTime() - 3600000 }
        ];
        unreadCount = notifications.filter(n => !n.read).length;
        renderNotifications();
    } else {
        // Pull from Firestore if possible, otherwise use mock
        getDoc(doc(db, 'notifications', user.uid)).then(snap => {
            if (snap.exists() && snap.data().items) {
                notifications = snap.data().items;
            } else {
                // initialize
                notifications = [
                    { id: 3, type: 'personal', message: `Welcome ${user.displayName || ''} to F1 Insight! Don't forget to set your favorite team.`, read: false, timestamp: Date.now() }
                ];
                setDoc(doc(db, 'notifications', user.uid), { items: notifications }).catch(() => { });
            }
            unreadCount = notifications.filter(n => !n.read).length;
            renderNotifications();
        }).catch(err => {
            console.warn("Notifications offline due to keys config.");
        });
    }
};

// Initial attach (unauth usually runs first)
attachNotificationListener(null);

// Bind into the global auth change layer
authService.initAuthListener(user => {
    attachNotificationListener(user);
});

// Auth Modal Logic mapped to React Island
function openModal() {
    window.dispatchEvent(new CustomEvent('open-auth-modal'));
}

// Defer Event Listener Attachments until interaction or mutation observation
document.body.addEventListener('click', (e) => {
    // Modal toggling delegation
    if (e.target.closest('#btn-login-modal')) openModal();
    if (e.target.closest('#team-close')) closeTeamModal();
});

