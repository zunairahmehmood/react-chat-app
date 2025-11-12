import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const CreatePostPage = ({ onCreatePost }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleCreate = () => {
    if (!title || !content) return;
    onCreatePost({ title, content });
    setTitle("");
    setContent("");
    navigate("/feed");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create New Post</h2>

        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-4 w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <textarea
          placeholder="Write your thoughts..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mb-4 w-full h-32 border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <div className="flex justify-between">
          <button
            onClick={handleCreate}
            className="cursor-pointer bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition"
          >
            Post
          </button>
          <button
            onClick={() => navigate("/feed")}
            className="text-gray-500 underline cursor-pointer hover:text-gray-700 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
