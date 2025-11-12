import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { firebaseAuth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

export const SignUpPage = ({ onSignUp }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!email || !password) return;
    setLoading(true);
    try {
      await firebaseAuth.signUp(email, password, firstName, lastName);
      navigate("/login");
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
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Sign Up</h1>
        </div>
        <input type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} className="mb-4 w-full p-2 border rounded" />
        <input type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} className="mb-4 w-full p-2 border rounded" />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="mb-4 w-full p-2 border rounded" />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="mb-4 w-full p-2 border rounded" />
        <button onClick={handleSignUp} disabled={loading} className="w-full bg-purple-500 text-white p-2 rounded mb-2 cursor-pointer hover:bg-purple-900 transition">
          {loading ? "Loading..." : "Sign Up"}
        </button>
        <p className="text-center">Already have an account? <button onClick={() => navigate("/login")} className="text-purple-600 underline cursor-pointer">Sign in</button></p>
      </div>
    </div>
  );
};