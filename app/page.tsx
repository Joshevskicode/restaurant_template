// restaurant_template/pages/index.tsx
'use client';
import { useEffect, useState } from 'react';

// Define the User type
interface User {
  acc: string;
  projectId: string;
}

export default function Home() {
  const [settings, setSettings] = useState({ title: 'Welcome to the Restaurant', subtitle: 'This is a sample restaurant webpage template.' });
  const [users, setUsers] = useState<User[]>([]); // Set the type of users to an array of User
  const [loading, setLoading] = useState(true);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    // Dynamically get the current URL
    const url = window.location.href;
    setCurrentUrl(url);

    // Fetch title and subtitle from MongoDB based on the current URL
    const fetchSettings = async () => {
      const res = await fetch(`/api/get-settings?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      if (data.success) {
        setSettings({ title: data.settings.title, subtitle: data.settings.subtitle });
      } else {
        console.error("Failed to fetch settings:", data.message);
      }
    };

    // Fetch users from MongoDB
    const fetchUsers = async () => {
      const res = await fetch('/api/get-users');
      const data = await res.json();
      if (data.success) {
        setUsers(data.users);
      } else {
        console.error('Failed to fetch users:', data.message);
      }
      setLoading(false);
    };

    // Call both fetches
    fetchSettings();
    fetchUsers();
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>{settings.title}</h1>
      <p>{settings.subtitle}</p>

      <h2>Current URL: {currentUrl}</h2>

      <h2>List of Users</h2>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              <strong>Account:</strong> {user.acc} - <strong>Project ID:</strong> {user.projectId}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
