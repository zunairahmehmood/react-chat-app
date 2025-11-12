import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDfSi6leacak2WLi6JCoz1JMUTBYtrUJSY",
  authDomain: "chat-board-2eea2.firebaseapp.com",
  projectId: "chat-board-2eea2",
  storageBucket: "chat-board-2eea2.firebasestorage.app",
  messagingSenderId: "598172374241",
  appId: "1:598172374241:web:4a1ec6409e5711a29e53a0",
  measurementId: "G-FKPH0PVZ9B"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Auth helpers
export const firebaseAuth = {
  signIn: (email, password) => signInWithEmailAndPassword(auth, email, password),
  signUp: (email, password) => createUserWithEmailAndPassword(auth, email, password),
  signOut: () => signOut(auth),
  getCurrentUser: () => auth.currentUser
};

// Firestore helpers
export const firebaseFirestore = {
  addPost: async (post) => {
    const docRef = await addDoc(collection(db, "posts"), { ...post, timestamp: Date.now(), comments: [] });
    return { id: docRef.id, ...post, timestamp: Date.now(), comments: [] };
  },
  getPosts: async () => {
    const snapshot = await getDocs(collection(db, "posts"));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },
  getPost: async (id) => {
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) return { id: docSnap.id, ...docSnap.data() };
    return null;
  },
  addComment: async (postId, comment) => {
    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, { comments: arrayUnion({ id: `comment_${Date.now()}`, ...comment, timestamp: Date.now() }) });
  }
};