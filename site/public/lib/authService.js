import { f1Auth as auth, f1Db as db, isLiveFirebase } from './firebase.js';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    signInWithRedirect,
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import { doc, setDoc, getDoc } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

// Phase 3 & 6: Singleton GoogleAuthProvider defined exactly once
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

let isMock = !isLiveFirebase;
let mockUser = JSON.parse(localStorage.getItem('f1_auth_user')) || null;
const authListeners = [];
const notifyAuth = () => authListeners.forEach(cb => {
    try {
        cb(mockUser);
    } catch (e) {
        console.error("[AuthService] Error in mock auth listener:", e);
    }
});

let authStateListener = null;

export const authService = {
    // Phase 1 & 6: Guard against duplicate listeners (to firebase) but support multiple app listeners
    initAuthListener(callback) {
        authListeners.push(callback);

        if (isMock) {
            callback(mockUser);
            return () => { };
        }

        // Only attach to Firebase once
        if (!authStateListener) {
            authStateListener = onAuthStateChanged(auth, async (user) => {
                try {
                    authListeners.forEach(cb => cb(user));
                } catch (err) {
                    console.error("[AuthService] Error in auth listener callback", err);
                }
            });
        } else {
            // Immediately invoke with current auth state if already initialized
            callback(auth.currentUser);
        }
        return () => {
            const idx = authListeners.indexOf(callback);
            if (idx > -1) authListeners.splice(idx, 1);
        };
    },

    async login(email, password) {
        if (!email || !password) throw new Error("Email and password are required.");
        if (isMock) {
            return new Promise((resolve) => setTimeout(() => {
                mockUser = { uid: 'u1', email, displayName: email.split('@')[0] };
                localStorage.setItem('f1_auth_user', JSON.stringify(mockUser));
                notifyAuth();
                resolve({ user: mockUser });
            }, 500));
        }
        return signInWithEmailAndPassword(auth, email, password);
    },

    // Phase 4: Signup Fix with validation
    async signup(email, password) {
        if (!email || !password) throw new Error("Email and password are required.");
        if (password.length < 6) throw new Error("Password must be at least 6 characters.");

        if (isMock) {
            return new Promise((resolve) => setTimeout(() => {
                mockUser = { uid: 'u1', email, displayName: email.split('@')[0] };
                localStorage.setItem('f1_auth_user', JSON.stringify(mockUser));
                notifyAuth();
                resolve({ user: mockUser });
            }, 500));
        }
        return createUserWithEmailAndPassword(auth, email, password);
    },

    // Phase 3: Google Auth Fix
    async loginWithGoogle() {
        if (isMock) {
            return new Promise((resolve) => setTimeout(() => {
                mockUser = { uid: 'u1', email: 'google@f1.com', displayName: 'Google Fan' };
                localStorage.setItem('f1_auth_user', JSON.stringify(mockUser));
                notifyAuth();
                resolve({ user: mockUser });
            }, 500));
        }

        try {
            return await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error("[AuthService] Google Popup Error Code:", error.code, "Message:", error.message);
            // Fallback to Redirect if popup is blocked or environment throws unauthorized domain
            if (error.code === 'auth/popup-blocked' || error.code === 'auth/unauthorized-domain' || error.code === 'auth/cancelled-popup-request') {
                console.warn("[AuthService] Popup blocked/unauthorized. Falling back to signInWithRedirect...");
                return signInWithRedirect(auth, googleProvider);
            }
            throw error;
        }
    },

    async logout() {
        if (isMock) {
            return new Promise((resolve) => setTimeout(() => {
                mockUser = null;
                localStorage.removeItem('f1_auth_user');
                notifyAuth();
                resolve();
            }, 300));
        }
        return signOut(auth);
    },

    // Phase 5: Firestore User Creation
    async ensureUserDoc(user) {
        if (!user || !user.uid) return;

        if (isMock) {
            let locals = JSON.parse(localStorage.getItem('f1_db') || '{}');
            if (!locals['users']) locals['users'] = {};
            if (!locals['users'][user.uid]) {
                locals['users'][user.uid] = {
                    displayName: user.displayName || 'F1 Fan',
                    email: user.email,
                    favoriteTeam: 'None',
                    createdAt: new Date().toISOString(),
                    preferences: { reducedMotion: false }
                };
                localStorage.setItem('f1_db', JSON.stringify(locals));
            }
            return;
        }

        const userRef = doc(db, 'users', user.uid);
        try {
            const snap = await getDoc(userRef);
            if (!snap.exists()) {
                await setDoc(userRef, {
                    displayName: user.displayName || 'F1 Fan',
                    email: user.email,
                    favoriteTeam: 'None',
                    createdAt: new Date().toISOString(),
                    preferences: { reducedMotion: false }
                }, { merge: true });
                console.log("[AuthService] Initialized new Firestore user document.");
            }
        } catch (err) {
            console.error("[AuthService] Failed to create Firestore user document.", err);
        }
    }
};
