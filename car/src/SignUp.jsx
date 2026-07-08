import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  
  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Status states
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    // Check if passwords match before sending to backend
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Registration failed.');
      }

      // If successful, send user to the login page
      navigate('/loogin'); 

    } catch (error) {
      setErrorMessage(error.message || 'Cannot connect to server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-zinc-950 min-h-screen w-full flex items-center justify-center font-sans p-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-xl space-y-6">
        
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Create Account</h2>
          <p className="text-zinc-400 text-sm mt-2">Join us for smart parking</p>
        </div>

        {/* Error Message Box */}
        {errorMessage && (
          <div className="bg-red-950/50 border border-red-800 text-red-400 p-3 rounded-lg text-sm text-center">
            {errorMessage}
          </div>
        )}

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          
          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Full Name</label>
            <input
              type="text"
              required
              disabled={isLoading}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
              placeholder="John Doe"
            />
          </div>

          {/* Email Input */}
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

          {/* Password Input */}
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

          {/* Confirm Password Input */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Confirm Password</label>
            <input
              type="password"
              required
              disabled={isLoading}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
              placeholder="••••••••"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-green-500 to-indigo-500 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 mt-2"
          >
            {isLoading ? 'Creating account...' : 'Get Started Now'}
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-sm text-zinc-500 mt-4">
          Already a member?{' '}
          <Link to="/loogin" className="text-indigo-400 hover:underline">
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
};

export default SignUp;