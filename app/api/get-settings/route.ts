// restaurant_template/app/api/get-settings/route.ts
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get('url');
    
    console.log('Received URL:', url);  // Log the incoming URL
    
    if (!url) {
      console.error('URL parameter missing');
      return NextResponse.json({ success: false, message: 'Missing URL' }, { status: 400 });
    }

    // Establish MongoDB connection
    const client = await clientPromise;
    const db = client.db('web_templify');
    console.log('Connected to MongoDB');
    
    // Query MongoDB to find the document with the matching URL
    const user = await db.collection('users').findOne({ url });
    
    if (!user || !user.settings) {
      console.error('Settings not found for this URL:', url);
      return NextResponse.json({ success: false, message: 'Settings not found for this URL' }, { status: 404 });
    }
    
    console.log('Settings found:', user.settings);
    return NextResponse.json({ success: true, settings: user.settings });
  } catch (error) {
    console.error('Error fetching settings:', error);  // Log any errors that occur
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
