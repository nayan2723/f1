import { f1Auth as auth, f1SignIn as signInWithEmailAndPassword, f1SignUp as createUserWithEmailAndPassword, f1SignInGoogle as signInWithGoogle, f1SignOut as signOut, f1OnAuthStateChanged as onAuthStateChanged, f1Db as db, f1Doc as doc, f1SetDoc as setDoc, f1GetDoc as getDoc } from './lib/firebase.js';
import { syncPersonalizationState, openTeamModal } from './lib/personalization.js';

// Reactive getters for DOM elements to prevent initialization race conditions
const getModal = () => document.getElementById('auth-modal');
const getCloseBtn = () => document.getElementById('auth-close');
const getForm = () => document.getElementById('auth-form');
const getEmailInput = () => document.getElementById('auth-email');
const getPassInput = () => document.getElementById('auth-password');
const getSubmitBtn = () => document.getElementById('auth-submit-btn');
const getGoogleBtn = () => document.getElementById('auth-google-btn');
const getToggleModeBtn = () => document.getElementById('auth-toggle-mode');
const getErrorBox = () => document.getElementById('auth-error');

let isSignUpMode = false;

// Render Navbar State
onAuthStateChanged(auth, async (user) => {
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
                signOut(auth);
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
onAuthStateChanged(auth, user => {
    attachNotificationListener(user);
});

// Auth Modal Logic
function openModal() {
    const modal = getModal();
    if (!modal) return;
    modal.classList.remove('hidden');
    // small delay for transition
    setTimeout(() => modal.classList.add('visible'), 10);
}

function closeModal() {
    const modal = getModal();
    const errorBox = getErrorBox();
    if (modal) {
        modal.classList.remove('visible');
        setTimeout(() => modal.classList.add('hidden'), 300);
    }
    if (errorBox) errorBox.classList.add('hidden');
}

// Defer Event Listener Attachments until interaction or mutation observation
document.body.addEventListener('click', (e) => {
    // Modal toggling delegation
    if (e.target.closest('#btn-login-modal')) openModal();
    if (e.target.closest('#auth-close')) closeModal();
    if (e.target === getModal()) closeModal();
    if (e.target.closest('#team-close')) closeTeamModal();

    // Toggle Mode
    const toggleBtn = e.target.closest('#auth-toggle-mode');
    if (toggleBtn) {
        e.preventDefault();
        isSignUpMode = !isSignUpMode;
        document.querySelector('.auth-header h2').textContent = isSignUpMode ? 'Create Account' : 'Driver Access';

        const submitBtn = getSubmitBtn();
        if (submitBtn) submitBtn.querySelector('.btn-text').textContent = isSignUpMode ? 'Sign Up' : 'Sign In';

        toggleBtn.textContent = isSignUpMode ? 'Sign In' : 'Sign Up';
        toggleBtn.parentElement.firstChild.textContent = isSignUpMode ? 'Already have an account? ' : "Don't have an account? ";

        const errorBox = getErrorBox();
        if (errorBox) errorBox.classList.add('hidden');
    }

    // Google Auth delegation
    if (e.target.closest('#auth-google-btn')) {
        e.preventDefault();
        handleGoogleAuth();
    }
});

// Handle Form Submission via delegation
document.body.addEventListener('submit', async (e) => {
    const form = getForm();
    if (e.target === form) {
        e.preventDefault();
        const emailInput = getEmailInput();
        const passInput = getPassInput();
        if (!emailInput || !passInput) return;

        const email = emailInput.value;
        const pass = passInput.value;

        setLoading(true);
        const errorBox = getErrorBox();
        if (errorBox) errorBox.classList.add('hidden');

        try {
            let cred;
            if (isSignUpMode) {
                cred = await createUserWithEmailAndPassword(auth, email, pass);
                await initializeUserDoc(cred.user);
            } else {
                cred = await signInWithEmailAndPassword(auth, email, pass);
            }
            closeModal();
        } catch (err) {
            showError(err.message);
        } finally {
            setLoading(false);
        }
    }
});

async function handleGoogleAuth() {
    setLoading(true);
    const errorBox = getErrorBox();
    if (errorBox) errorBox.classList.add('hidden');
    try {
        const cred = await signInWithGoogle();
        await initializeUserDoc(cred.user);
        closeModal();
    } catch (err) {
        showError(err.message);
    } finally {
        setLoading(false);
    }
}

// Helpers
function setLoading(isLoading) {
    const submitBtn = getSubmitBtn();
    const googleBtn = getGoogleBtn();
    if (submitBtn) submitBtn.disabled = isLoading;
    if (googleBtn) googleBtn.disabled = isLoading;

    if (submitBtn) {
        const btnText = submitBtn.querySelector('.btn-text');
        if (isLoading) {
            btnText.dataset.original = btnText.textContent;
            btnText.textContent = 'Processing...';
        } else {
            btnText.textContent = btnText.dataset.original || 'Sign In';
        }
    }
}

function showError(msg) {
    const errorBox = getErrorBox();
    if (errorBox) {
        errorBox.textContent = msg;
        errorBox.classList.remove('hidden');
    }
}

async function initializeUserDoc(user) {
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, {
        displayName: user.displayName || 'F1 Fan',
        email: user.email,
        favoriteTeam: 'None',
        createdAt: new Date().toISOString(),
        preferences: {
            reducedMotion: false
        }
    }, { merge: true });
}


