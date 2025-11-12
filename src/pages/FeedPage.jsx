import { Upload, LogOut } from "lucide-react";
import { PostCard } from "../components/PostCard";
import { useNavigate } from "react-router-dom";

export const FeedPage = ({ posts, onLogout }) => {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-md sticky top-0 z-50 p-4 flex justify-between items-center">
        <h1 className="font-bold text-3xl text-purple-600">ChatBoard Lite</h1>
        <div className="flex gap-4">
          <button onClick={() => navigate("/create")}>
            <button
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-2 rounded-full shadow-lg hover:scale-105 transition-transform duration-200 ease-in-out cursor-pointer"
              >
              <p className="text-2xl pb-1">+</p>
              <span className="font-semibold">Create Post</span>
            </button>
            {/* <Upload className="text-purple-500 hover:text-purple-700" /> */}
          </button>
          <button onClick={onLogout}>
            <LogOut className="text-red-500 hover:text-red-700 cursor-pointer" />
          </button>
        </div>
      </div>

      {/* Feed */}
      <div className="max-w-5xl mx-auto p-6 grid gap-5">
        {posts.length === 0 ? (
          <div className="text-center text-gray-500">No posts yet. Create one!</div>
        ) : (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </div>
    </div>
  );
};