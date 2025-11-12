import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { firebaseAuth } from "../firebase/firebaseConfig";
import { useNavigate, Link } from "react-router-dom";

export const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) return;
    setLoading(true);
    try {
      await firebaseAuth.signIn(email, password);
      onLogin(firebaseAuth.getCurrentUser());
      navigate("/feed");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4 animate-pulse">
            <MessageCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Login</h1>
        </div>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="mb-4 w-full p-2 border rounded" />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="mb-4 w-full p-2 border rounded" />
        <button onClick={handleLogin} disabled={loading} className="w-full bg-purple-500 text-white p-2 rounded mb-2 cursor-pointer hover:bg-purple-900 transition">
          {loading ? "Loading..." : "Sign In"}
        </button>
        <p className="text-center">Don't have an account? <button onClick={() => navigate("/signup")} className="text-purple-600 underline cursor-pointer">Sign up</button></p>
      </div>
    </div>
  );
};