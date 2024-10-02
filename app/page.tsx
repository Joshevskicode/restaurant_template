// restaurant_template/pages/index.tsx
'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [settings, setSettings] = useState({ title: 'Welcome to the Restaurant', subtitle: 'This is a sample restaurant webpage template.' });

  // Hardcoded URL for now
  const hardcodedURL = "https://restauranttemplate-deployment-1727863748220.vercel.app"; 

  useEffect(() => {
    // Fetch title and subtitle from MongoDB based on the hardcoded URL
    const fetchSettings = async () => {
      const res = await fetch(`/api/get-settings?url=${encodeURIComponent(hardcodedURL)}`);
      const data = await res.json();
      if (data.success) {
        setSettings({ title: data.settings.title, subtitle: data.settings.subtitle });
      } else {
        console.error("Failed to fetch settings:", data.message);
      }
    };
    fetchSettings();
  }, [hardcodedURL]);

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>{settings.title}</h1>
      <p>{settings.subtitle}</p>
    </div>
  );
}
