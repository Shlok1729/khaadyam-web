import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Lazy initialization: PrismaClient is only created when first accessed,
// not at module evaluation time. This prevents build failures on Vercel
// where DATABASE_URL may not be available during the build phase.
export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
