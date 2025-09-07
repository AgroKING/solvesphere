
import React, { useState } from 'react';
import { useAuth } from '../useAuth';

interface SignUpScreenProps {
  onSignInClick: () => void;
}

export const SignUpScreen: React.FC<SignUpScreenProps> = ({ onSignInClick }) => {
  const { signup } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    const success = signup(username, password);
    if (!success) {
      setError('Username already taken.');
    } else {
      setError('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full">
        <div className="flex justify-center items-center space-x-3 mb-8">
            <div className="bg-primary p-3 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m0 18a9 9 0 009-9m-9 9a9 9 0 00-9-9" /></svg>
            </div>
            <h1 className="text-4xl font-bold text-primary">SolveSphere</h1>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">Create an Account</h2>
          <p className="text-center text-muted mb-6">Join the community and start solving!</p>
          <form onSubmit={handleSignUp} className="space-y-4">
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <div>
              <label htmlFor="username-signup" className="text-sm font-medium text-gray-700">Username</label>
              <input
                id="username-signup"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                placeholder="Choose a username"
                autoComplete="username"
              />
            </div>
            <div>
              <label htmlFor="password-signup"className="text-sm font-medium text-gray-700">Password</label>
              <input
                id="password-signup"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                placeholder="Create a password"
                autoComplete="new-password"
              />
            </div>
             <div>
              <label htmlFor="confirm-password-signup"className="text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                id="confirm-password-signup"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                placeholder="Confirm your password"
                autoComplete="new-password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
            >
              Sign Up
            </button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{' '}
            <button onClick={onSignInClick} className="font-medium text-primary hover:underline">
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
