// This is pure Node.js code running inside Next.js
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Fetching from the database using the singleton client
    const products = await prisma.product.findMany();
    
    return NextResponse.json(products);
  } catch (error) {
    console.error("Fetch products error:", error);
    return NextResponse.json({ error: "Failed to fetch snacks" }, { status: 500 });
  }
}