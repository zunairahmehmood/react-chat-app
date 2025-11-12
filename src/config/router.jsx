import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { LoginPage } from "../pages/LoginPage";
import { SignUpPage } from '../pages/SignupPage';
import { FeedPage } from "../pages/FeedPage";
import { CreatePostPage } from "../pages/CreatePostPage";
import { PostDetailPage } from "../pages/PostDetailPage";
import { firebaseAuth, firebaseFirestore } from "../firebase/firebaseConfig";

export const AppRouter = () => {
  const [user, setUser] = useState(firebaseAuth.getCurrentUser());
  const [posts, setPosts] = useState([]);

  // Live posts update with proper cleanup
  useEffect(() => {
    if (!user) return;
    const unsubscribe = setInterval(async () => {
      try {
        const fetchedPosts = await firebaseFirestore.getPosts();
        setPosts(fetchedPosts);
      } catch (err) {
        console.error("Error fetching posts:", err.message);
      }
    }, 1000);

    return () => clearInterval(unsubscribe);
  }, [user]);

  const handleLogin = (user) => setUser(user);
  const handleLogout = async () => {
    await firebaseAuth.signOut();
    setUser(null);
  };
  const handleCreatePost = async (postData) => {
    if (!user) return;
    try {
      await firebaseFirestore.addPost({ ...postData, userId: user.uid });
      const updatedPosts = await firebaseFirestore.getPosts();
      setPosts(updatedPosts);
    } catch (err) {
      console.error("Error adding post:", err.message);
    }
  };

  // Redirect non-authenticated users
  if (!user) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignUpPage onSignUp={handleLogin} />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    );
  }

  // For authenticated users
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FeedPage posts={posts} onLogout={handleLogout} />} />
        <Route path="/feed" element={<FeedPage posts={posts} onLogout={handleLogout} />} />
        <Route path="/create" element={<CreatePostPage onCreatePost={handleCreatePost} />} />
        <Route
          path="/post/:postId"
          element={<PostDetailWrapper />}
        />
        <Route path="*" element={<Navigate to="/feed" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

// Wrapper to pass postId param to PostDetailPage
const PostDetailWrapper = () => {
  const { postId } = useParams();
  return <PostDetailPage postId={postId} />;
};

