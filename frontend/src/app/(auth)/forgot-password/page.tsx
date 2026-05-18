'use client';

import { useState } from 'react';
import { auth, sendPasswordResetEmail } from '@/lib/firebase';

export default function ForgotPasswordPage() {
  let [email, setEmail] = useState('');
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState<string | null>(null);
  let [sent, setSent] = useState(false);

  let handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await sendPasswordResetEmail(auth, email);
      setSent(true);
    } catch (err: any) {
      switch (err.code) {
        case 'auth/user-not-found':
        case 'auth/invalid-email':
          setSent(true);
          break;
        default:
          setError('Failed to send reset email. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-center mb-2">Check your email</h2>
            <p className="text-center text-sm text-gray-600">
              If an account with <strong>{email}</strong> exists, a password reset link has been sent.
            </p>
          </div>

          <a
            href="/login"
            className="block w-full text-center py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700"
          >
            Back to Sign In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-center mb-2">Reset your password</h2>
          <p className="text-center text-sm text-gray-600">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send reset link'}
          </button>
        </form>

        <div className="text-center text-sm text-gray-500">
          <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            ← Back to Sign In
          </a>
        </div>
      </div>
    </div>
  );
}
