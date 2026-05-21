'use client';

import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';

let API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4500';

function ConditionBadge({ label }: { label: string }) {
  let map: Record<string, string> = {
    Excellent: 'bg-green-100 text-green-700',
    Good: 'bg-blue-100 text-blue-700',
    Fair: 'bg-yellow-100 text-yellow-700',
    Poor: 'bg-red-100 text-red-700',
    New: 'bg-zinc-200 text-zinc-800',
    Used: 'bg-zinc-100 text-zinc-600',
  };
  return (
    <span className={`px-2 py-1 rounded-xl text-xs font-medium ${map[label] || 'bg-zinc-100'}`}>
      {label}
    </span>
  );
}

function ProductCard({ item }: { item: any }) {
  return (
    <button className="w-full bg-white border border-zinc-200 rounded-2xl overflow-hidden text-left hover:shadow-sm transition-shadow">
      <div className="flex">
        <div className="w-[220px] h-[160px] shrink-0">
          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <h2 className="font-bold text-lg text-zinc-900">{item.title}</h2>
              <div className="w-9 h-9 rounded-full bg-zinc-300 shrink-0" />
            </div>
            <div className="text-xl font-black text-zinc-900 mt-1">{item.price}</div>
            <div className="flex gap-2 mt-2">
              <ConditionBadge label={item.condition} />
              <ConditionBadge label={item.status} />
            </div>
          </div>
          <p className="text-sm text-zinc-500">📍 {item.location}</p>
        </div>
      </div>
    </button>
  );
}

function ServiceCard({ item }: { item: any }) {
  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-5 flex gap-4">
      <img src={item.avatar} alt={item.name} className="w-16 h-16 rounded-2xl object-cover shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <h2 className="font-black text-zinc-900">{item.name}</h2>
          <span className="text-sm font-semibold text-zinc-900 shrink-0 ml-2">⭐ {item.rating}</span>
        </div>
        <p className="text-zinc-700 font-medium mt-0.5">{item.skill}</p>
        <div className="flex gap-2 mt-2 flex-wrap">
          {item.tags.map((tag: string, i: number) => (
            <span key={i} className="text-xs bg-zinc-100 text-zinc-700 px-2 py-1 rounded-xl">{tag}</span>
          ))}
        </div>
        <p className="text-sm text-zinc-500 mt-2">📍 {item.location}</p>
      </div>
    </div>
  );
}

function JobCard({ item }: { item: any }) {
  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-5 flex items-center justify-between gap-4">
      <div className="flex gap-4 items-center min-w-0">
        <img src={item.logo} alt={item.company} className="w-12 h-12 rounded-xl object-cover shrink-0" />
        <div className="min-w-0">
          <h2 className="font-black text-zinc-900 truncate">{item.title}</h2>
          <p className="text-zinc-600 text-sm truncate">{item.company} • {item.type}</p>
        </div>
      </div>
      <div className="text-right shrink-0">
        <div className="font-black text-zinc-900">{item.salary}</div>
        <p className="text-sm text-zinc-500">{item.location}</p>
      </div>
    </div>
  );
}

function TabSwitcher({ active, onTabChange }: { active: string; onTabChange: (tab: string) => void }) {
  let tabs = [
    { key: 'products', label: 'Products' },
    { key: 'services', label: 'Services' },
    { key: 'jobs', label: 'Jobs' },
  ];
  return (
    <div className="flex items-center gap-1 bg-zinc-100 rounded-2xl p-1">
      {tabs.map((tab) => {
        let isActive = active === tab.key;
        return (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`h-9 px-5 rounded-xl text-sm font-medium transition-all ${
              isActive ? 'bg-white shadow-sm text-black' : 'text-zinc-500 hover:text-black'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

let products = [
  { id: 1, title: 'iPhone 15 Pro Max', price: '₦2,300,000', condition: 'Excellent', status: 'New', location: 'Abuja • 3km away', image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1200&auto=format&fit=crop' },
  { id: 2, title: 'PlayStation 5 Console', price: '₦850,000', condition: 'Good', status: 'Used', location: 'Lagos • 1.2km away', image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=1200&auto=format&fit=crop' },
  { id: 3, title: 'MacBook Pro M3', price: '₦3,900,000', condition: 'Good', status: 'Used', location: 'PH • 800m away', image: 'https://images.unsplash.com/photo-1517336714739-489689fd1ca8?q=80&w=1200&auto=format&fit=crop' },
];

let services = [
  { id: 1, name: 'Sarah Johnson', skill: 'Wedding Videographer', tags: ['Video Editing', 'Drone', 'Photography'], rating: '4.8', location: 'Lagos • 2km', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop' },
  { id: 2, name: 'Michael Chen', skill: 'UI/UX Designer', tags: ['Figma', 'Product Design', 'Prototyping'], rating: '4.7', location: 'Abuja • 5km', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop' },
  { id: 3, name: 'Amaka Obi', skill: 'Hair Stylist', tags: ['Braiding', 'Makeup', 'Natural Hair'], rating: '4.9', location: 'Lagos • 0.8km', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1200&auto=format&fit=crop' },
];

let jobs = [
  { id: 1, title: 'Senior Frontend Engineer', company: 'Nova Technologies', salary: '₦450k - ₦650k/mo', type: 'Remote • Full-time', location: 'Global', logo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop' },
  { id: 2, title: 'Product Designer', company: 'FinCore', salary: '₦350k - ₦500k/mo', type: 'Hybrid • Full-time', location: 'Abuja', logo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop' },
  { id: 3, title: 'Social Media Manager', company: 'Luxe Brands', salary: '₦180k - ₦250k/mo', type: 'On-site • Part-time', location: 'Lagos', logo: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&auto=format&fit=crop' },
];

export default function FeedPage() {
  let [activeTab, setActiveTab] = useState('products');
  let [query, setQuery] = useState('');

  let feedItems = (activeTab === 'products') ? products
             : (activeTab === 'services') ? services
             : jobs;

  let filteredItems = useMemo(() => {
    if (!query.trim()) return feedItems;
    let q = query.toLowerCase();
    return feedItems.filter((item: any) => {
      if (activeTab === 'products') return item.title?.toLowerCase().includes(q) || item.location?.toLowerCase().includes(q);
      if (activeTab === 'services') return item.name?.toLowerCase().includes(q) || item.skill?.toLowerCase().includes(q) || item.tags?.some((t: string) => t.toLowerCase().includes(q));
      return item.title?.toLowerCase().includes(q) || item.company?.toLowerCase().includes(q);
    });
  }, [feedItems, query, activeTab]);

  return (
    <div className="space-y-3">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search listings, services, jobs..."
          className="w-full h-10 pl-9 pr-4 bg-zinc-100 border-none rounded-2xl text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300"
        />
      </div>

      {/* Tab Switcher */}
      <TabSwitcher active={activeTab} onTabChange={setActiveTab} />

      {/* Feed */}
      {filteredItems.length > 0 ? (
        filteredItems.map((item) => (
          <div key={item.id}>
            {activeTab === 'products' && <ProductCard item={item} />}
            {activeTab === 'services' && <ServiceCard item={item} />}
            {activeTab === 'jobs' && <JobCard item={item} />}
          </div>
        ))
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border border-zinc-200">
          <p className="text-zinc-600 mb-2">No results found</p>
          <p className="text-sm text-zinc-500">Try a different search term</p>
        </div>
      )}
    </div>
  );
}
