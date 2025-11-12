import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const [reactions, setReactions] = useState({ heart: 0, laugh: 0, thumbsUp: 0, shocked: 0, crying: 0, angry: 0 });
  const [userReaction, setUserReaction] = useState(null);

  const handleReaction = (type) => {
    if (userReaction === type) {
      setReactions((prev) => ({ ...prev, [type]: prev[type] - 1 }));
      setUserReaction(null);
    } else {
      setReactions((prev) => ({
        ...prev,
        [type]: prev[type] + 1,
        ...(userReaction ? { [userReaction]: prev[userReaction] - 1 } : {}),
      }));
      setUserReaction(type);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{post.title}</h3>
      <p className="text-gray-700 mb-4">{post.content}</p>

      <div className="flex gap-3 items-center text-sm">
        <button className="cursor-pointer" onClick={() => handleReaction("heart")}>❤️ {reactions.heart}</button>
        <button className="cursor-pointer" onClick={() => handleReaction("laugh")}>😂 {reactions.laugh}</button>
        <button className="cursor-pointer" onClick={() => handleReaction("shocked")}>😮 {reactions.shocked}</button>
        <button className="cursor-pointer" onClick={() => handleReaction("crying")}>😢 {reactions.crying}</button>
        <button className="cursor-pointer" onClick={() => handleReaction("angry")}>😡 {reactions.angry}</button>
        <button className="cursor-pointer" onClick={() => handleReaction("thumbsUp")}>👍 {reactions.thumbsUp}</button>
        <button
          onClick={() => navigate(`/post/${post.id}`)}
          className="flex items-center gap-1 text-purple-600 hover:text-purple-800 ml-auto cursor-pointer"
        >
          <MessageCircle size={16} /> {post.comments?.length || 0}
        </button>
      </div>
    </div>
  );
};
