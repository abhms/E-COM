import { useState } from 'react';
import 'tailwindcss/tailwind.css';
import { Navbar } from '../../components/Navbar';
import axios from 'axios';
const Signup: React.FC = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error,setError]=useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      console.log('All fields are required');
      setError("all fields are required")
      return;
    }
    const res =await axios.post("/api/register",{name,email,password}) 
    console.log('Signup:', res);
  };

  return (
    <>
      <Navbar />

      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
          <h1 className="text-2xl font-semibold text-center text-gray-700">
            Create an account
          </h1>
          <form className="mt-6" onSubmit={handleSignup}>
            <div className="mb-2">
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-800"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-800"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-800"
              >
                Password
              </label>
              <input
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <p className="text-xs text-gray-800 font-bold">
              Password must be at least 8 characters long
            </p>
          {error && error.length?error:null}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-gray-800 rounded-lg hover:bg-gray-900 focus:outline-none focus:bg-gray-600"
              >
                Sign up
              </button>
            </div>
          </form>
          <p className="mt-2 text-xs text-center text-gray-700">
            Already a member?{' '}
            <a
              href="/auth/signin"
              className="font-medium text-gray-600 hover:underline"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
