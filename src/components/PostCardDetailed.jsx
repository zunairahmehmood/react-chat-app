export const PostCardDetailed = ({ post }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg mb-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-3">{post.title}</h2>
      <p className="text-gray-700">{post.content}</p>
    </div>
  );
};
