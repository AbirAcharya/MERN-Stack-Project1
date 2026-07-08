import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Loogin = () => {
  const navigate = useNavigate();
  
  // Form input states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Status communication states
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      // Direct call to our backend login route
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      // Check for bad request or server error flags
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Login failed.');
      }

      // Success! Store the user's secure token inside localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('userName', data.user.name);

      // Redirect user right to the main dashboard/home landing page
      navigate('/'); 

    } catch (error) {
      setErrorMessage(error.message || 'Cannot connect to server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-zinc-950 min-h-screen w-full flex items-center justify-center font-sans p-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-xl space-y-6">
        
        {/* Header Title */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
          <p className="text-zinc-400 text-sm mt-2">Please sign in to your account</p>
        </div>

        {/* Dynamic Alert Banner */}
        {errorMessage && (
          <div className="bg-red-950/50 border border-red-800 text-red-400 p-3 rounded-lg text-sm text-center">
            {errorMessage}
          </div>
        )}

        {/* Input fields */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          
          {/* Email Address */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Email Address</label>
            <input
              type="email"
              required
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
              placeholder="you@example.com"
            />
          </div>

          {/* User Password */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Password</label>
            <input
              type="password"
              required
              disabled={isLoading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
              placeholder="••••••••"
            />
          </div>

          {/* Action Login Submission */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-green-500 to-indigo-500 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 mt-4"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Alternative Pathway Redirect */}
        <p className="text-center text-sm text-zinc-500 mt-4">
          Not a member yet?{' '}
          <Link to="/buy" className="text-indigo-400 hover:underline">
            Register now
          </Link>
        </p>

      </div>
      {/* User Password */}
          

          {/* --- ADDED HERE --- */}
          <div className="flex justify-end text-sm pt-1">
            <Link 
              to="/forgot-password" 
              className="absolute top-150 left-160 font-medium text-cyan-400 hover:text-cyan-300 transition-colors hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Action Login Submission */}
          <button
            type="submit"></button>
            
      
    </div>
  );
};

export default Loogin;