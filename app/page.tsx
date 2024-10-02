// restaurant_template/pages/index.tsx
'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [settings, setSettings] = useState({ title: 'Welcome to the Restaurant', subtitle: 'This is a sample restaurant webpage template.' });
  const [currentURL, setCurrentURL] = useState<string | null>(null);

  useEffect(() => {
    // Get the current URL dynamically using window.location.href
    if (typeof window !== 'undefined') {
      setCurrentURL(window.location.href);
    }
  }, []);

  useEffect(() => {
    if (currentURL) {
      // Fetch title and subtitle from MongoDB based on the current URL
      const fetchSettings = async () => {
        const res = await fetch(`/api/get-settings?url=${encodeURIComponent(currentURL)}`);
        const data = await res.json();
        if (data.success) {
          setSettings({ title: data.settings.title, subtitle: data.settings.subtitle });
        } else {
          console.error("Failed to fetch settings:", data.message);
        }
      };
      fetchSettings();
    }
  }, [currentURL]);

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>{settings.title}</h1>
      <p>{settings.subtitle}</p>
    </div>
  );
}
