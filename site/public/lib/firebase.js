import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import {
    getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword,
    signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import {
    getFirestore, doc, setDoc, getDoc, onSnapshot, collection, query, limit, orderBy
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

let app, auth, db;
let isMock = false;

// Simulated Mock functions for Local Development without Vercel Serverless
let mockUser = JSON.parse(localStorage.getItem('f1_auth_user')) || null;
const authListeners = [];

const notifyAuth = () => authListeners.forEach(cb => cb(mockUser));

try {
    const firebaseConfig = {
        apiKey: "AIzaSyCCOLY1CK0BacrnXDELpzM6800hOy_0IRk",
        authDomain: "f1-insights-37bcf.firebaseapp.com",
        projectId: "f1-insights-37bcf",
        storageBucket: "f1-insights-37bcf.firebasestorage.app",
        messagingSenderId: "455396545391",
        appId: "1:455396545391:web:9146459aa127f429300e9a"
    };
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    console.log('Firebase Web SDK initialized successfully.');
} catch (e) {
    console.error('Firebase initialization error', e);
    isMock = true;
}

if (isMock) {
    console.warn('Vercel Config missing or offline. Falling back to Local Auth Mock.');
    auth = { currentUser: mockUser };
    db = {};
}

// Proxied Exports to handle both Real Production & Local Graceful Degradation
export const f1Auth = auth;
export const f1Db = db;
export const isLiveFirebase = !isMock;

export const f1OnAuthStateChanged = (callback) => {
    if (isMock) {
        authListeners.push(callback);
        callback(mockUser);
        return () => { };
    }
    return onAuthStateChanged(auth, callback);
};

export const f1SignIn = async (email, pass) => {
    if (isMock) {
        return new Promise((resolve) => setTimeout(() => {
            mockUser = { uid: 'u1', email, displayName: email.split('@')[0] };
            localStorage.setItem('f1_auth_user', JSON.stringify(mockUser));
            notifyAuth();
            resolve({ user: mockUser });
        }, 500));
    }
    return signInWithEmailAndPassword(auth, email, pass);
};

export const f1SignUp = async (email, pass) => {
    if (isMock) {
        return new Promise((resolve) => setTimeout(() => {
            mockUser = { uid: 'u1', email, displayName: email.split('@')[0] };
            localStorage.setItem('f1_auth_user', JSON.stringify(mockUser));
            notifyAuth();
            resolve({ user: mockUser });
        }, 500));
    }
    return createUserWithEmailAndPassword(auth, email, pass);
};

export const f1SignOut = async () => {
    if (isMock) {
        return new Promise((resolve) => setTimeout(() => {
            mockUser = null;
            localStorage.removeItem('f1_auth_user');
            notifyAuth();
            resolve();
        }, 300));
    }
    return signOut(auth);
};

export const f1SignInGoogle = async () => {
    if (isMock) {
        return new Promise((resolve) => setTimeout(() => {
            mockUser = { uid: 'u1', email: 'google@f1.com', displayName: 'Google Fan' };
            localStorage.setItem('f1_auth_user', JSON.stringify(mockUser));
            notifyAuth();
            resolve({ user: mockUser });
        }, 500));
    }
    return signInWithPopup(auth, new GoogleAuthProvider());
};

export const f1SetDoc = async (docRef, data, options) => {
    if (isMock) {
        let locals = JSON.parse(localStorage.getItem('f1_db') || '{}');
        if (!locals[docRef.collection]) locals[docRef.collection] = {};
        if (options?.merge) {
            locals[docRef.collection][docRef.id] = { ...locals[docRef.collection][docRef.id], ...data };
        } else {
            locals[docRef.collection][docRef.id] = data;
        }
        localStorage.setItem('f1_db', JSON.stringify(locals));
        return Promise.resolve();
    }
    return setDoc(docRef, data, options);
};

export const f1GetDoc = async (docRef) => {
    if (isMock) {
        let locals = JSON.parse(localStorage.getItem('f1_db') || '{}');
        const data = locals[docRef.collection]?.[docRef.id];
        return Promise.resolve({ exists: () => !!data, data: () => data });
    }
    return getDoc(docRef);
};

export const f1Doc = (collectionPath, documentId) => {
    if (isMock) return { collection: collectionPath, id: documentId };
    return doc(db, collectionPath, documentId);
};

// Passthroughs for complex queries (mock will ignore for now, to ensure no crashes)
export const f1OnSnapshot = onSnapshot;
export const f1Collection = collection;
export const f1Query = query;
export const f1Limit = limit;
export const f1OrderBy = orderBy;
