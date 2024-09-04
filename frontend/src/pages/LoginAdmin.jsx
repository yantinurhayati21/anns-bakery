import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../App";
import Cookies from 'js-cookie';
import HeaderAdmin from "./HeaderAdmin";
import FooterAdmin from "../components/FooterAdmin";

const LoginAdmin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/login/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        Cookies.set('token', data.accessToken, { expires: 1 }); // Save token in cookies for 1 day
        setIsLoggedIn(true);
        navigate('/admin/dashboard'); // Redirect to home or other page
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData);
        alert('Login failed!'); // Customize the error message based on response
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed!');
    }
  };

  return (
    <>
      <HeaderAdmin/>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h1>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleLogin}
          className="w-full py-3 bg-purple-400 text-white rounded-lg hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Login
        </button>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/register-admin" className="text-indigo-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
    <FooterAdmin/>
    </>
  );
};

export default LoginAdmin;
