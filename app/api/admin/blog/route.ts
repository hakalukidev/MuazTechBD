import { db } from '@/lib/firebase';
import { normalizeBlogPost } from '@/lib/blog-type';
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
    const posts = snapshot.docs.map((doc) => normalizeBlogPost(doc.id, doc.data()));
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
    const timestamp = new Date().toISOString();
    const blogRef = collection(db, 'blog');
    const docRef = await addDoc(blogRef, {
      ...body,
      createdAt: timestamp,
      updatedAt: timestamp,
    });
    return NextResponse.json(
      normalizeBlogPost(docRef.id, {
        ...body,
        createdAt: timestamp,
        updatedAt: timestamp,
      }),
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });
  }
}
