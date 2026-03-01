// This is pure Node.js code running inside Next.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetching from the database we just set up
    const products = await prisma.product.findMany();
    
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch snacks" }, { status: 500 });
  }
}