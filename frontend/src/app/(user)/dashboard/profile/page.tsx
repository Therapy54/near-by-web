'use client';

import { useState, useEffect } from 'react';
import { storage, ref, uploadBytes, getDownloadURL } from '@/lib/firebase';

let API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4500';

export default function ProfilePage() {
  let [profile, setProfile] = useState<any>(null);
  let [loading, setLoading] = useState(true);
  let [saving, setSaving] = useState(false);
  let [uploadingAvatar, setUploadingAvatar] = useState(false);
  let [error, setError] = useState<string | null>(null);
  let [success, setSuccess] = useState(false);
  let [bio, setBio] = useState('');
  let [location, setLocation] = useState('');
  let [availability, setAvailability] = useState('');
  let [skills, setSkills] = useState('');
  let [avatarUrl, setAvatarUrl] = useState('');
  let [socialLinks, setSocialLinks] = useState('');

  useEffect(() => {
    let fetchProfile = async () => {
      try {
        let res = await fetch(`${API_URL}/profile/me`, { credentials: 'include' });
        let data = await res.json();
        if (data.success && data.data) {
          let p = data.data;
          setProfile(p);
          setBio(p.bio || '');
          setLocation(p.location || '');
          setAvailability(p.availability || '');
          setSkills(Array.isArray(p.skills) ? p.skills.join(', ') : '');
          setAvatarUrl(p.avatarurl || '');
          if (p.sociallinks) setSocialLinks(Object.entries(p.sociallinks).map(([k, v]) => `${k}:${v}`).join(', '));
        }
      } catch (err: any) { setError('Failed to load profile'); }
      finally { setLoading(false); }
    };
    fetchProfile();
  }, []);

  let handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files?.[0];
    if (!file) return;
    setUploadingAvatar(true);
    setError(null);
    setSuccess(false);
    try {
      let storageRef = ref(storage, `avatars/${Date.now()}_${file.name}`);
      let snapshot = await uploadBytes(storageRef, file);
      let url = await getDownloadURL(snapshot.ref);
      setAvatarUrl(url);
    } catch (err: any) {
      console.error(err);
      setError('Failed to upload avatar image');
    } finally { setUploadingAvatar(false); }
  };

  let handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);
    let skillsArray = skills.split(',').map(s => s.trim()).filter(s => s);
    let socialLinksObj: Record<string, string> = {};
    socialLinks.split(',').forEach(pair => {
      let [key, ...valueParts] = pair.trim().split(':');
      if (key && valueParts.length > 0) socialLinksObj[key.trim()] = valueParts.join(':').trim();
    });
    try {
      let res = await fetch(`${API_URL}/profile/me`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bio: bio || null,
          location: location || null,
          availability: availability || null,
          skills: skillsArray.length > 0 ? skillsArray : null,
          avatarUrl: avatarUrl || null,
          socialLinks: Object.keys(socialLinksObj).length > 0 ? socialLinksObj : null
        })
      });
      let data = await res.json();
      if (data.success) { setSuccess(true); setProfile(data.data); }
      else { setError(data.error?.message || 'Failed to update profile'); }
    } catch (err: any) { setError('Failed to update profile'); }
    finally { setSaving(false); }
  };

  if (loading) return (
    <div className="max-w-3xl mx-auto">
      <div className="h-8 bg-zinc-200 rounded mb-4 w-48 animate-pulse"></div>
      <div className="h-96 bg-zinc-100 rounded-xl animate-pulse"></div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-black text-zinc-900 mb-6">Your Profile</h1>
      {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">{error}</div>}
      {success && <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-600 rounded-lg text-sm">Profile updated successfully!</div>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl p-6 border border-zinc-200">
          <h2 className="font-bold text-zinc-900 mb-4">Basic Info</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Bio</label>
              <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} placeholder="Tell people about yourself..."
                className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none resize-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Location</label>
              <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="City, Country"
                className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Availability</label>
              <select value={availability} onChange={(e) => setAvailability(e.target.value)}
                className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none">
                <option value="">Select availability</option>
                <option value="Available">Available</option>
                <option value="Busy">Busy</option>
                <option value="Open to opportunities">Open to opportunities</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Skills</label>
              <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)}
                placeholder="comma separated, e.g., React, Node.js, Design"
                className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none" />
              <p className="text-xs text-zinc-500 mt-1">Separate skills with commas</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Avatar Image</label>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Avatar preview" className="w-16 h-16 rounded-full object-cover border border-zinc-200 shadow-sm" />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center border border-zinc-200"><span className="text-2xl">👤</span></div>
                )}
                <div className="flex-1 w-full">
                  <input type="file" accept="image/*" onChange={handleAvatarUpload}
                    className="block w-full text-sm text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-zinc-100 file:text-black hover:file:bg-zinc-200 file:cursor-pointer" />
                  {uploadingAvatar && <p className="text-xs text-zinc-500 mt-1">Uploading avatar...</p>}
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Avatar URL (Optional)</label>
              <input type="url" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="https://example.com/avatar.jpg"
                className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Social Links</label>
              <input type="text" value={socialLinks} onChange={(e) => setSocialLinks(e.target.value)}
                placeholder="label:url, label2:url2 (e.g., GitHub:https://github.com/user)"
                className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none" />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button type="submit" disabled={saving || uploadingAvatar}
            className="px-6 py-2 bg-black text-white rounded-lg font-medium hover:bg-zinc-800 transition disabled:opacity-50">{saving ? 'Saving...' : 'Save Profile'}</button>
        </div>
      </form>
    </div>
  );
}
