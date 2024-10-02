// app/page.tsx

import { headers } from 'next/headers';
import React from 'react';

// Define the User type
interface User {
  acc: string;
  projectId: string;
}

// Define the Settings type
interface Settings {
  title: string;
  subtitle: string;
}

export default async function Home() {
  // Retrieve headers to construct the current URL
  const headersList = headers();
  const host = headersList.get('host') || 'localhost';
  
  // Determine the protocol. This might need adjustment based on your deployment (e.g., HTTPS)
  const protocol = headersList.get('x-forwarded-proto') || 'http';
  
  // Get the pathname. If not available, default to '/'
  const pathname = headersList.get('x-invoke-path') || '/';
  
  // Construct the full URL
  let url = `${protocol}://${host}${pathname}`;
  
  // Remove trailing slash if it exists
  if (url.endsWith('/')) {
    url = url.slice(0, -1);
  }
  
  // Log the processed URL (optional)
  console.log('Processed URL without trailing slash:', url);
  
  // Initialize default settings
  let settings: Settings = {
    title: 'Welcome to the Restaurant',
    subtitle: 'This is a sample restaurant webpage template.',
  };
  
  // Fetch settings from the API
  try {
    const settingsRes = await fetch(`${protocol}://${host}/api/get-settings?url=${encodeURIComponent(url)}`, {
      // Ensure fresh data on each request
      cache: 'no-store',
    });
    
    const settingsData = await settingsRes.json();
    
    if (settingsData.success) {
      settings = {
        title: settingsData.settings.title,
        subtitle: settingsData.settings.subtitle,
      };
    } else {
      console.error('Failed to fetch settings:', settingsData.message);
    }
  } catch (error) {
    console.error('Error fetching settings:', error);
  }
  
  // Initialize users array
  let users: User[] = [];
  
  // Fetch users from the API
  try {
    const usersRes = await fetch(`${protocol}://${host}/api/get-users`, {
      // Ensure fresh data on each request
      cache: 'no-store',
    });
    
    const usersData = await usersRes.json();
    
    if (usersData.success) {
      users = usersData.users;
    } else {
      console.error('Failed to fetch users:', usersData.message);
    }
  } catch (error) {
    console.error('Error fetching users:', error);
  }
  
  // Render the component with fetched data
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>{settings.title}</h1>
      <p>{settings.subtitle}</p>
      
      {/* Optionally render users */}
     
    </div>
  );
}
