'use client';

import { useState } from 'react';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

export default function ForgotPasswordPage() {
  let [email, setEmail] = useState('');
  let [loading, setLoading] = useState(false);
  let [sent, setSent] = useState(false);

  let handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setSent(true);
    } catch (err: any) {
      switch (err.code) {
        case 'auth/user-not-found':
        case 'auth/invalid-email':
          alert('If an account with this email exists, a reset link has been sent.');
          break;
        default:
          alert('Failed to send reset email. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="min-h-screen bg-[#F7F7F5] overflow-hidden relative">
        <div className="absolute top-[-120px] left-[-120px] w-[320px] h-[320px] bg-violet-200/40 blur-3xl rounded-full" />
        <div className="absolute bottom-[-120px] right-[-120px] w-[320px] h-[320px] bg-blue-100/50 blur-3xl rounded-full" />

        <div className="relative z-10 min-h-screen grid lg:grid-cols-[1.1fr_0.9fr]">
          <div className="hidden lg:flex flex-col justify-between p-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-[22px] bg-black text-white flex items-center justify-center text-xl font-black shadow-xl shadow-black/10">
                N
              </div>
              <div>
                <div className="text-3xl font-black tracking-[-0.04em] text-zinc-900">Near-By</div>
                <div className="text-sm text-zinc-500 mt-1">Global local discovery network</div>
              </div>
            </div>

            <div className="max-w-2xl px-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/80 backdrop-blur-md px-4 py-2 text-sm font-medium shadow-sm">
                <span className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.6 9h16.8M3.6 15h16.8M12 3a15.3 15.3 0 010 18M12 3a15.3 15.3 0 000 18" />
                  </svg>
                  Products • Services • Jobs • Opportunities
                </span>
              </div>

              <h1 className="mt-8 text-[72px] leading-[0.95] tracking-[-0.06em] font-black text-zinc-900">
                Discover everything happening around you.
              </h1>

              <p className="mt-8 text-xl text-zinc-600 leading-relaxed max-w-xl">
                Connect instantly with nearby products, freelancers, apartments, jobs and real-world opportunities.
              </p>

              <div className="mt-12 grid grid-cols-2 gap-5">
                <div className="bg-white rounded-[30px] border border-zinc-200 p-5 shadow-xl shadow-zinc-200/40 rotate-[-2deg]">
                  <img
                    src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop"
                    className="w-full h-[180px] object-cover rounded-2xl"
                  />
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-zinc-900">iPhone 15 Pro</div>
                      <div className="text-sm text-zinc-500 mt-1">1.2km away</div>
                    </div>
                    <div className="text-lg font-black">₦1.8M</div>
                  </div>
                </div>

                <div className="space-y-5 mt-10">
                  <div className="bg-white rounded-[28px] border border-zinc-200 p-5 shadow-lg">
                    <div className="flex items-center gap-4">
                      <img
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop"
                        className="w-14 h-14 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-bold">Sarah Johnson</div>
                        <div className="text-sm text-zinc-500 mt-1">Wedding Videographer</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black text-white rounded-[28px] p-6 shadow-2xl shadow-black/20">
                    <div className="text-sm text-white/60 uppercase tracking-[0.2em]">Live Opportunities</div>
                    <div className="mt-4 text-5xl font-black tracking-[-0.05em]">15K+</div>
                    <div className="mt-2 text-white/70">Active listings around the world.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 px-8 text-sm text-zinc-500">
              <span>Trusted worldwide</span>
              <div className="w-1 h-1 rounded-full bg-zinc-300" />
              <span>120+ cities</span>
              <div className="w-1 h-1 rounded-full bg-zinc-300" />
              <span>Fast local discovery</span>
            </div>
          </div>

          <div className="flex items-center justify-center p-6 lg:p-10">
            <div className="w-full max-w-[470px]">
              <div className="lg:hidden flex items-center gap-3 mb-10 justify-center">
                <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center font-black text-lg">N</div>
                <div className="text-3xl font-black tracking-[-0.04em]">Near-By</div>
              </div>

              <div className="bg-white/85 backdrop-blur-2xl border border-white shadow-[0_20px_80px_rgba(0,0,0,0.08)] rounded-[36px] p-8 lg:p-10">
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 rounded-full px-4 py-2 text-sm font-semibold">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Check your email
                  </div>

                  <h2 className="mt-6 text-[42px] tracking-[-0.05em] leading-[1] font-black text-zinc-900">
                    Reset link sent
                  </h2>

                  <p className="mt-4 text-zinc-500 leading-relaxed text-[15px] max-w-md mx-auto">
                    If an account with <strong className="text-zinc-900">{email}</strong> exists, a password reset link has been sent to that address.
                  </p>
                </div>

                <div className="mt-10">
                  <Link
                    href="/login"
                    className="block w-full h-[64px] rounded-2xl bg-black text-white font-bold text-[16px] shadow-2xl shadow-black/15 hover:scale-[0.99] active:scale-[0.98] transition-all text-center leading-[64px]"
                  >
                    Back to Sign In
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F7F5] overflow-hidden relative">
      <div className="absolute top-[-120px] left-[-120px] w-[320px] h-[320px] bg-violet-200/40 blur-3xl rounded-full" />
      <div className="absolute bottom-[-120px] right-[-120px] w-[320px] h-[320px] bg-blue-100/50 blur-3xl rounded-full" />

      <div className="relative z-10 min-h-screen grid lg:grid-cols-[1.1fr_0.9fr]">
        <div className="hidden lg:flex flex-col justify-between p-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-[22px] bg-black text-white flex items-center justify-center text-xl font-black shadow-xl shadow-black/10">
              N
            </div>
            <div>
              <div className="text-3xl font-black tracking-[-0.04em] text-zinc-900">Near-By</div>
              <div className="text-sm text-zinc-500 mt-1">Global local discovery network</div>
            </div>
          </div>

          <div className="max-w-2xl px-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/80 backdrop-blur-md px-4 py-2 text-sm font-medium shadow-sm">
              <span className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.6 9h16.8M3.6 15h16.8M12 3a15.3 15.3 0 010 18M12 3a15.3 15.3 0 000 18" />
                </svg>
                Products • Services • Jobs • Opportunities
              </span>
            </div>

            <h1 className="mt-8 text-[72px] leading-[0.95] tracking-[-0.06em] font-black text-zinc-900">
              Discover everything happening around you.
            </h1>

            <p className="mt-8 text-xl text-zinc-600 leading-relaxed max-w-xl">
              Connect instantly with nearby products, freelancers, apartments, jobs and real-world opportunities.
            </p>

            <div className="mt-12 grid grid-cols-2 gap-5">
              <div className="bg-white rounded-[30px] border border-zinc-200 p-5 shadow-xl shadow-zinc-200/40 rotate-[-2deg]">
                <img
                  src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop"
                  className="w-full h-[180px] object-cover rounded-2xl"
                />
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-zinc-900">iPhone 15 Pro</div>
                    <div className="text-sm text-zinc-500 mt-1">📍 1.2km away</div>
                  </div>
                  <div className="text-lg font-black">₦1.8M</div>
                </div>
              </div>

              <div className="space-y-5 mt-10">
                <div className="bg-white rounded-[28px] border border-zinc-200 p-5 shadow-lg">
                  <div className="flex items-center gap-4">
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop"
                      className="w-14 h-14 rounded-2xl object-cover"
                    />
                    <div>
                      <div className="font-bold">Sarah Johnson</div>
                      <div className="text-sm text-zinc-500 mt-1">Wedding Videographer</div>
                    </div>
                  </div>
                </div>

                <div className="bg-black text-white rounded-[28px] p-6 shadow-2xl shadow-black/20">
                  <div className="text-sm text-white/60 uppercase tracking-[0.2em]">Live Opportunities</div>
                  <div className="mt-4 text-5xl font-black tracking-[-0.05em]">15K+</div>
                  <div className="mt-2 text-white/70">Active listings around the world.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 px-8 text-sm text-zinc-500">
            <span>Trusted worldwide</span>
            <div className="w-1 h-1 rounded-full bg-zinc-300" />
            <span>120+ cities</span>
            <div className="w-1 h-1 rounded-full bg-zinc-300" />
            <span>Fast local discovery</span>
          </div>
        </div>

        <div className="flex items-center justify-center p-6 lg:p-10">
          <div className="w-full max-w-[470px]">
            <div className="lg:hidden flex items-center gap-3 mb-10 justify-center">
              <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center font-black text-lg">N</div>
              <div className="text-3xl font-black tracking-[-0.04em]">Near-By</div>
            </div>

            <div className="bg-white/85 backdrop-blur-2xl border border-white shadow-[0_20px_80px_rgba(0,0,0,0.08)] rounded-[36px] p-8 lg:p-10">
              <div>
                <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 rounded-full px-4 py-2 text-sm font-semibold">
                  <span className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 0h10.5A2.25 2.25 0 0119.5 12.75v6A2.25 2.25 0 0117.25 21h-10.5A2.25 2.25 0 014.5 18.75v-6A2.25 2.25 0 016.75 10.5z" />
                    </svg>
                    Reset Password
                  </span>
                </div>

                <h2 className="mt-6 text-[42px] tracking-[-0.05em] leading-[1] font-black text-zinc-900">
                  Forgot your password?
                </h2>

                <p className="mt-4 text-zinc-500 leading-relaxed text-[15px] max-w-md">
                  No worries, enter your email and we'll send you a reset link.
                </p>
              </div>

              <div className="mt-10 space-y-5">
                <div>
                  <label className="text-[13px] font-bold uppercase tracking-[0.15em] text-zinc-500 block mb-3">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.909A2.25 2.25 0 012.25 6.993V6.75" />
                      </svg>
                    </div>
                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-[62px] rounded-2xl border border-zinc-200 bg-[#FAFAFA] pl-14 pr-5 outline-none focus:border-black focus:bg-white transition-all text-[15px]"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={loading || !email}
                  className="w-full h-[64px] rounded-2xl bg-black text-white font-bold text-[16px] shadow-2xl shadow-black/15 hover:scale-[0.99] active:scale-[0.98] transition-all disabled:opacity-50"
                >
                  {loading ? 'Sending...' : 'Send reset link'}
                </button>
              </div>

              <div className="mt-8 text-center">
                <Link href="/login" className="text-sm font-semibold text-zinc-500 hover:text-black transition-all">
                  ← Back to Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
