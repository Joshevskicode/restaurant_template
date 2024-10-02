// app/api/get-settings/route.ts
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ success: false, message: 'Missing URL' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db('web_templify');
    
    // Find the project by URL
    const user = await db.collection('users').findOne({ url });

    if (user && user.settings) {
      return NextResponse.json({ success: true, settings: user.settings });
    } else {
      return NextResponse.json({ success: false, message: 'Settings not found for this URL' });
    }
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({ success: false, message: 'Error fetching settings' }, { status: 500 });
  }
}
