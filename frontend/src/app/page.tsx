'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Soft background blurs — fixed, pointer-events-none so they don't block interaction */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-160px] left-[-160px] w-[600px] h-[600px] bg-violet-200/40 blur-[160px] rounded-full" />
        <div className="absolute bottom-[-160px] right-[-160px] w-[600px] h-[600px] bg-blue-100/40 blur-[160px] rounded-full" />
      </div>

      {/* ══════════════════════════════
          HERO — split layout (desktop)
          stacked layout (mobile)
      ══════════════════════════════ */}
      <div className="min-h-[auto] grid lg:grid-cols-[1.1fr_0.9fr]">

        {/* ← LEFT PANE — brand + headline + stat row (desktop only) */}
        <div className="hidden lg:flex flex-col justify-between p-8">
          {/* Logo block */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-[22px] bg-black text-white flex items-center justify-center text-xl font-black shadow-xl shadow-black/10">
              N
            </div>
            <div>
              <div className="text-3xl font-black tracking-[-0.04em] text-zinc-900">Near-By</div>
              <div className="text-sm text-zinc-500 mt-1">Global local discovery network</div>
            </div>
          </div>

          {/* Hero headline + stat row */}
          <div className="max-w-[520px] px-2">
            {/* Tag pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/80 backdrop-blur-md px-4 py-2 text-sm font-medium shadow-sm">
              <span className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.6 9h16.8M3.6 15h16.8M12 3a15.3 15.3 0 010 18M12 3a15.3 15.3 0 000 18" />
                </svg>
                Products &bull; Services &bull; Jobs &bull; Opportunities
              </span>
            </div>

            <h1 className="mt-8 text-[72px] leading-[0.95] tracking-[-0.06em] font-black text-zinc-900">
              Discover everything happening around you.
            </h1>

            <p className="mt-8 text-xl text-zinc-600 leading-relaxed">
              Connect instantly with nearby products, freelancers, apartments, jobs and real-world opportunities.
            </p>

            {/* Stat row — dashed divider feel */}
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-zinc-400">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                15K+ listings live
              </span>
              <span>|</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" />
                120+ cities
              </span>
              <span>|</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                Free to join
              </span>
            </div>
          </div>

          {/* Footer micro line */}
          <div className="flex items-center gap-3 px-2 text-xs text-zinc-400">
            <span>Trusted worldwide</span>
            <div className="w-1 h-1 rounded-full bg-zinc-300" />
            <span>Real-time discovery</span>
            <div className="w-1 h-1 rounded-full bg-zinc-300" />
            <span>No fees to browse</span>
          </div>
        </div>

        {/* → RIGHT PANE — stat strip + CTA card */}
        <div className="flex flex-col">
          {/* Top: stat strip — desktop only */}
          <div className="hidden lg:block flex-1 p-8 pb-0">
            <div className="grid grid-cols-2 gap-5 h-full">
              {/* Large stat card */}
              <div className="bg-black text-white rounded-[30px] p-6 shadow-2xl shadow-black/20 flex flex-col justify-end">
                <div className="text-sm text-white/60 uppercase tracking-[0.2em] mt-auto pt-8">
                  Active Listings
                </div>
                <div className="mt-3 text-6xl font-black tracking-[-0.06em] leading-none">
                  15K<span className="text-3xl font-black">+</span>
                </div>
                <div className="mt-2 text-white/40 text-sm">
                  and growing every minute
                </div>
              </div>

              {/* Feature mini-cards */}
              <div className="flex flex-col gap-5 h-full justify-center">
                <div className="bg-white rounded-[28px] border border-zinc-200 p-5 shadow-lg flex-shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center text-lg">🛍️</div>
                    <div>
                      <div className="font-bold text-zinc-900 text-sm">Products</div>
                      <div className="text-xs text-zinc-400">Thousands available</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-[28px] border border-zinc-200 p-5 shadow-lg flex-shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-lg">🎯</div>
                    <div>
                      <div className="font-bold text-zinc-900 text-sm">Jobs &amp; Services</div>
                      <div className="text-xs text-zinc-400">Find opportunities nearby</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white rounded-[28px] p-6 shadow-xl shadow-violet-500/30">
                  <div className="text-xs font-bold text-white/70 uppercase tracking-[0.2em]">Free to Start</div>
                  <div className="mt-2 text-zinc-100 text-sm leading-relaxed">
                    Sign up free. No credit card needed. Browse listings instantly.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Card — same glass card as auth pages */}
          <div className="flex-1 flex items-center justify-center p-6 lg:p-10">
            <div className="w-full max-w-[470px]">
              {/* Mobile brand — visible on small screens */}
              <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
                <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center font-black text-lg">N</div>
                <div className="text-3xl font-black tracking-[-0.04em]">Near-By</div>
              </div>

              <div className="bg-white/85 backdrop-blur-2xl border border-white shadow-[0_20px_80px_rgba(0,0,0,0.08)] rounded-[36px] p-8 lg:p-10">
                <div>
                  <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 rounded-full px-4 py-2 text-sm font-semibold">
                    <span className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18l-1.813-2.096L5 15l2.187-.904L9 12l.813 2.096L12 15l-2.187.904zM18 13l.75 1.938L20.688 15 18.75 15.75 18 17.688 17.25 15.75 15.313 15l1.938-.063L18 13zM12 3l1.125 2.906L16 7.031l-2.875 1.125L12 11l-1.125-2.844L8 7.031l2.875-1.125L12 3z" />
                      </svg>
                      Welcome to Near-By
                    </span>
                  </div>

                  {/* Responsive headline — desktop: 42px, tablet: 36px, mobile: 32px */}
                  <h2 className="mt-6 text-[42px] sm:text-[36px] leading-[1] font-black text-zinc-900">
                    Start discovering
                  </h2>

                  <p className="mt-4 text-zinc-500 text-[15px] sm:text-base leading-relaxed max-w-md">
                    Join thousands of users finding nearby products, services, jobs, and opportunities — instantly.
                  </p>
                </div>

                <div className="mt-8 sm:mt-10 space-y-4">
                  <Link
                    href="/register"
                    className="block w-full h-14 sm:h-16 rounded-2xl bg-black text-white font-bold text-[16px] shadow-2xl shadow-black/15 hover:scale-[0.99] active:scale-[0.98] transition-all flex items-center justify-center text-center"
                  >
                    Get Started Free
                  </Link>

                  <Link
                    href="/login"
                    className="block w-full h-14 sm:h-[62px] rounded-2xl border border-zinc-200 bg-white hover:bg-zinc-50 transition-all flex items-center justify-center gap-3 font-semibold text-[15px] shadow-sm text-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    I already have an account
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════ FEATURES ══════════ */}
      <section id="features" className="py-16 sm:py-20 md:py-24 relative bg-white/50 border-t border-zinc-200/30">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-black text-zinc-900 tracking-tight mb-4">
              Everything You Need in One Platform
            </h2>
            <p className="text-base sm:text-lg text-zinc-500 max-w-2xl mx-auto leading-relaxed">
              From discovery to connection &mdash; browse listings, find jobs, showcase skills, and connect with people nearby.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {[
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6 sm:w-7 sm:h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                  </svg>
                ),
                title: 'Discover Products',
                desc: 'Find local products and services near you with real-time listings and direct contact with sellers.',
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6 sm:w-7 sm:h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                  </svg>
                ),
                title: 'Find Opportunities',
                desc: 'Search for jobs, gigs, freelancing, and career opportunities tailored to your location and skills.',
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6 sm:w-7 sm:h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 4.5c0 1.29.892 2.373 2.106 2.618a43.06 43.06 0 003.986.235 8.21 8.21 0 011.963 3.258c1.177 1.117 2.816 1.791 4.872 1.791h5.25a1.875 1.875 0 001.875-1.875v-.132A48.017 48.017 0 0112 12a48.017 48.017 0 01-7.712-.816 42.56 42.56 0 00-2.927 1.476A7.562 7.562 0 009.75 8.625h1.5z" />
                  </svg>
                ),
                title: 'Direct Connection',
                desc: 'Message, call, and connect with providers instantly through our real-time messaging system.',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group p-6 sm:p-8 bg-white/70 backdrop-blur-sm rounded-[30px] border border-zinc-200 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Icon row */}
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-zinc-900 flex items-center justify-center text-white shrink-0">
                    {feature.icon}
                  </div>
                  <div className="h-px flex-1 bg-zinc-200" />
                </div>

                <h3 className="text-base sm:text-lg font-black text-zinc-900 tracking-[-0.02em]">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm sm:text-[15px] text-zinc-500 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ HOW IT WORKS ══════════ */}
      <section id="how-it-works" className="py-16 sm:py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-black text-zinc-900 tracking-tight mb-4">
              How It Works
            </h2>
            <p className="text-base sm:text-lg text-zinc-500 max-w-2xl mx-auto">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
            {[
              { step: '1', title: 'Create Account', desc: 'Sign up with email or Google in seconds' },
              { step: '2', title: 'Set Location', desc: 'Share your location for hyper-local results' },
              { step: '3', title: 'Start Discovering', desc: 'Browse and connect with opportunities nearby' },
            ].map((item, i) => (
              <div key={i} className="group text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-black text-white text-xl font-black tracking-[-0.02em] shadow-xl shadow-black/10 group-hover:scale-105 transition-transform mb-5">
                  {item.step}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-zinc-900 mb-2">{item.title}</h3>
                <p className="text-sm sm:text-[15px] text-zinc-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ BOTTOM CTA BAND ══════════ */}
      <section className="py-12 sm:py-16 lg:py-20 bg-black">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
          <h2 className="text-[clamp(1.5rem,3.5vw,2.5rem)] font-black text-white tracking-tight mb-3 sm:mb-4">
            Ready to get started?
          </h2>
          <p className="text-sm sm:text-lg text-white/50 mb-6 sm:mb-10 max-w-lg mx-auto leading-relaxed">
            Join thousands already discovering opportunities near them. Free to join.
          </p>
          <Link
            href="/register"
            className="inline-block px-8 sm:px-10 py-3.5 sm:py-4 bg-white text-zinc-900 rounded-2xl font-bold text-sm sm:text-[16px] shadow-2xl hover:bg-zinc-100 transition-all min-h-[56px]"
          >
            Create Your Account
          </Link>
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer className="bg-zinc-50 border-t border-zinc-200/50 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center font-black text-sm">N</div>
              <span className="font-black text-zinc-900 tracking-[-0.04em]">Near-By</span>
            </div>
            <p className="text-sm text-zinc-500">&copy; 2026 Near-By. All rights reserved.</p>
            <div className="flex items-center gap-4 text-sm text-zinc-400">
              <Link href="/register" className="hover:text-zinc-600 transition-colors">Sign Up</Link>
              <span className="text-zinc-300">/</span>
              <Link href="/login" className="hover:text-zinc-600 transition-colors">Sign In</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
