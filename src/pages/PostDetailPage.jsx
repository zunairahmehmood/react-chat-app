import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { firebaseFirestore } from "../firebase/firebaseConfig";
import { PostCardDetailed } from "../components/PostCardDetailed";

export const PostDetailPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => setPost(await firebaseFirestore.getPost(postId));
    fetchPost();
  }, [postId]);

  const handleAddComment = async () => {
    if (!comment || !post) return;
    await firebaseFirestore.addComment(post.id, { content: comment });
    setComment("");
    setPost(await firebaseFirestore.getPost(postId));
  };

  if (!post)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="mb-4 text-gray-500">Post not found</p>
        <button onClick={() => navigate("/feed")} className="text-purple-600 underline">
          Back
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 p-6">
      <div className="max-w-3xl mx-auto">
        <PostCardDetailed post={post} />

        <div className="mt-6 bg-white rounded-2xl shadow p-4">
          <textarea
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 mb-3 focus:ring-2 focus:ring-purple-400"
          />
          <div className="flex justify-between">
            <button
              onClick={handleAddComment}
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition cursor-pointer"
            >
              Comment
            </button>
            <button
              onClick={() => navigate("/feed")}
              className="text-gray-600 underline cursor-pointer hover:text-gray-800"
            >
              Back
            </button>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="font-semibold text-gray-800 mb-2">Comments:</h3>
          {post.comments?.length ? (
            post.comments.map((c) => (
              <div key={c.id} className="bg-white rounded-lg shadow p-3 mb-2">
                <p>{c.content}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};
