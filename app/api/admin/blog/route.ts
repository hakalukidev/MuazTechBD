import { db } from '@/lib/firebase';
import { addDoc, collection, getDocs, orderBy, query } from 'firebase/firestore';
import { NextRequest, NextResponse } from 'next/server';

// GET - Fetch all blog posts
export async function GET() {
  try {
      if (!db) {
    return NextResponse.json({ error: 'Firestore not initialized' }, { status: 500 });
  }
    const blogRef = collection(db, 'blog');
    const q = query(blogRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}

// POST - Create new blog post
export async function POST(request: NextRequest) {
  try {
      if (!db) {
    return NextResponse.json({ error: 'Firestore not initialized' }, { status: 500 });
  }
    const body = await request.json();
    const blogRef = collection(db, 'blog');
    const docRef = await addDoc(blogRef, {
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return NextResponse.json({ id: docRef.id, ...body }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });
  }
}
