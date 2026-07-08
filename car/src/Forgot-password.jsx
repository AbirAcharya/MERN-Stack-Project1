import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [visibleCode, setVisibleCode] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setMessage('');
    setVisibleCode('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to process request.');
      }

      // Success! Show success messaging and print out the code on screen
      setMessage('Account found! A security recovery code has been generated.');
      setVisibleCode(data.code); 

    } catch (error) {
      setErrorMessage(error.message || 'Cannot connect to server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-zinc-950 min-h-screen w-full flex items-center justify-center font-sans p-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-xl space-y-6">
        
        {/* Header Titles */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Reset Password</h2>
          <p className="text-zinc-400 text-sm mt-2">Enter your email to verify your account</p>
        </div>

        {/* Error Alert Box */}
        {errorMessage && (
          <div className="bg-red-950/50 border border-red-800 text-red-400 p-3 rounded-lg text-sm text-center">
            {errorMessage}
          </div>
        )}

        {/* Success Alert Box */}
        {message && (
          <div className="bg-green-950/50 border border-green-800 text-green-400 p-4 rounded-lg text-sm text-center space-y-2">
            <div>{message}</div>
            {visibleCode && (
              <div className="text-lg font-black tracking-widest text-white bg-zinc-950 py-1.5 rounded border border-zinc-800 mt-2">
                CODE: {visibleCode}
              </div>
            )}
          </div>
        )}

        {/* Recovery input form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
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

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-green-500 to-indigo-500 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 mt-4"
          >
            {isLoading ? 'Checking profile...' : 'Generate Reset Code'}
          </button>
        </form>

        {/* Path redirections */}
        <p className="text-center text-sm text-zinc-500 mt-4">
          Remember your details?{' '}
          <Link to="/loogin" className="text-indigo-400 hover:underline">
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
};

export default ForgotPassword;