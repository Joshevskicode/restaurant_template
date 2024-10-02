// restaurant_template/app/api/get-users/route.ts
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('web_templify');
    
    // Fetch all users from the 'users' collection
    const users = await db.collection('users').find({}).toArray();
    
    return NextResponse.json({ success: true, users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ success: false, message: 'Error fetching users' }, { status: 500 });
  }
}
