'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, LogOut } from 'lucide-react';

export default function AppBar() {
  let router = useRouter();

  let handleLogout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4500'}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch {}
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-zinc-200">
      <div className="max-w-5xl mx-auto h-14 px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/dashboard" className="text-xl font-black tracking-tight text-zinc-900 shrink-0">
          NEAR-BY
        </Link>

        {/* Profile + Logout */}
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/dashboard/profile"
            className="h-9 px-4 rounded-2xl bg-black text-white text-[13px] font-medium hidden sm:block hover:bg-zinc-800 transition"
          >
            Profile
          </Link>

          {/* Mobile hamburger — navigates to /dashboard?menu=profile */}
          <button
            className="sm:hidden h-9 w-9 rounded-2xl bg-black text-white flex items-center justify-center"
            onClick={() => {
              let params = new URLSearchParams(window.location.search);
              let isOpen = params.get('menu') === 'profile';
              router.push(isOpen ? '/dashboard' : '/dashboard?menu=profile');
            }}
            aria-label="Open menu"
          >
            <User className="w-4 h-4" />
          </button>

          <button
            onClick={handleLogout}
            className="hidden sm:block h-9 px-3 rounded-2xl text-[13px] text-zinc-500 hover:text-red-600 hover:bg-red-50 transition-all font-medium"
          >
            Log out
          </button>
        </div>
      </div>
    </header>
  );
}
