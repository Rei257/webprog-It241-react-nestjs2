import { useEffect, useState } from 'react';

// Relative path for Vercel's rewrite engine
const API_URL = '/api/guestbook';

export default function App() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ name: '', message: '' });

  // 1. Fetch data from the API
  const load = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      if (Array.isArray(data)) setEntries(data);
    } catch (err) {
      console.error("Load failed:", err);
    }
  };

  useEffect(() => { load(); }, []);

  // 2. Submit data to the API
  const save = async (e) => {
    e.preventDefault();
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    
    if (res.ok) {
      setForm({ name: '', message: '' });
      load(); // Refresh the list
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>My Profile & Guestbook</h1>
      
      <form onSubmit={save} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input 
          placeholder="Your Name" 
          value={form.name} 
          onChange={e => setForm({...form, name: e.target.value})} 
          required 
          style={{ padding: '8px' }}
        />
        <textarea 
          placeholder="Leave a message..." 
          value={form.message} 
          onChange={e => setForm({...form, message: e.target.value})} 
          required 
          style={{ padding: '8px', minHeight: '80px' }}
        />
        <button type="submit" style={{ padding: '10px', cursor: 'pointer', background: '#3ecf8e', color: 'white', border: 'none', borderRadius: '4px' }}>
          Sign Guestbook
        </button>
      </form>

      <hr style={{ margin: '2rem 0' }} />

      <h3>Entries</h3>
      {entries.length === 0 ? <p>No entries yet. Be the first!</p> : (
        entries.map(e => (
          <div key={e.id} style={{ borderBottom: '1px solid #eee', padding: '10px 0' }}>
            <p><strong>{e.name}</strong></p>
            <p style={{ color: '#555' }}>{e.message}</p>
          </div>
        ))
      )}
    </div>
  );
}