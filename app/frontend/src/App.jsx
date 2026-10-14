import { useEffect, useState } from 'react';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const load = async () => {
    try {
      const res = await fetch('/notes');
      if (!res.ok) throw new Error();
      setNotes(await res.json());
      setError('');
    } catch {
      setError('Could not load notes');
    }
  };

  useEffect(() => { load(); }, []);

  const add = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await fetch('/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    setText('');
    load();
  };

  const remove = async (id) => {
    await fetch(`/notes/${id}`, { method: 'DELETE' });
    load();
  };

  return (
    <main style={{ maxWidth: 480, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>Notes</h1>
      <form onSubmit={add}>
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="New note" />
        <button type="submit">Add</button>
      </form>
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      <ul>
        {notes.map((n) => (
          <li key={n.id}>
            {n.text} <button onClick={() => remove(n.id)}>x</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
