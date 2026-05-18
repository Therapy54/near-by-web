'use client';

import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function RegisterPage() {
  let [step, setStep] = useState<'name' | 'method' | 'confirmation'>('name');
  let [enteredDisplayName, setEnteredDisplayName] = useState('');
  let [displayNameError, setDisplayNameError] = useState('');
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState<string | null>(null);

  let validateDisplayName = (value: string): boolean => {
    let trimmed = value.trim();
    if (trimmed.length < 2) {
      setDisplayNameError('Display name must be between 2 and 24 characters');
      return false;
    }
    if (trimmed.length > 24) {
      setDisplayNameError('Display name must be between 2 and 24 characters');
      return false;
    }
    setDisplayNameError('');
    return true;
  };

  let handleNameNext = () => {
    if (validateDisplayName(enteredDisplayName)) {
      setStep('method');
    }
  };

  let handleNameBack = () => {
    setStep('name');
  };

  let handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateDisplayName(enteredDisplayName)) {
      setStep('name');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      let userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: enteredDisplayName.trim() });
      window.location.href = '/login';
    } catch (err: any) {
      setError('Registration failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  let handleGoogleSignIn = async () => {
    if (!validateDisplayName(enteredDisplayName)) {
      setStep('name');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      let provider = new GoogleAuthProvider();
      let userCredential = await signInWithPopup(auth, provider);
      await updateProfile(userCredential.user, { displayName: enteredDisplayName.trim() });
      window.location.href = '/login';
    } catch (err: any) {
      setError('Google sign up failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  //
  // STEP 1 — Display Name
  //
  if (step === 'name') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-center mb-2">Choose your display name</h2>
            <p className="text-center text-sm text-gray-600">
              This is how other users will see you on Near-By
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
              <input
                type="text"
                required
                minLength={2}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  displayNameError ? 'border-red-500' : 'border-gray-300'
                }`}
                value={enteredDisplayName}
                onChange={(e) => {
                  setEnteredDisplayName(e.target.value);
                  if (displayNameError) validateDisplayName(e.target.value);
                }}
                onBlur={() => validateDisplayName(enteredDisplayName)}
                placeholder="e.g. Jane Doe"
                autoFocus
              />
              {displayNameError && (
                <p className="mt-1 text-sm text-red-600">{displayNameError}</p>
              )}
            </div>

            <button
              type="button"
              onClick={handleNameNext}
              disabled={enteredDisplayName.trim().length < 2 || enteredDisplayName.trim().length > 24}
              className="w-full py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              Continue
            </button>
          </div>

          <div className="mt-4 text-center text-sm text-gray-500">
            <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Already have an account? Sign in
            </a>
          </div>
        </div>
      </div>
    );
  }

  //
  // STEP 2 — Account Method (email or google)
  //
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-center mb-1">Finish signing up</h2>
          <p className="text-center text-sm text-gray-600">
            Signing up as &ldquo;{enteredDisplayName.trim()}&rdquo;
          </p>
          <button
            type="button"
            onClick={handleNameBack}
            className="mt-2 mx-auto block text-sm text-indigo-600 hover:text-indigo-500"
          >
            ← Change display name
          </button>
        </div>

        {error && (
          <p className="text-sm text-red-600 text-center">{error}</p>
        )}

        <form onSubmit={handleEmailSignup} className="space-y-4">
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              required
              minLength={8}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">or</span>
          </div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full py-2 bg-white text-gray-700 font-medium rounded-md border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50"
        >
          Sign up with Google
        </button>

        <div className="mt-4 text-center text-sm text-gray-500">
          <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Already have an account? Sign in
          </a>
        </div>
      </div>
    </div>
  );
}
