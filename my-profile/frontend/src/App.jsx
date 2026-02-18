import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js'; // Add this

// 1. Initialize Supabase directly
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function App() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ name: '', message: '' });

  // 2. Load directly from Supabase
  const load = async () => {
    const { data } = await supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setEntries(data);
  };

  useEffect(() => { load(); }, []);

  // 3. Save directly to Supabase
  const save = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('guestbook').insert([form]);
    if (!error) {
      setForm({ name: '', message: '' });
      load();
    } else {
      console.error(error);
    }
  };

  // ... rest of your return() code is the same ...