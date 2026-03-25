import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // Security check: Only allow ADMIN role
  if (!session?.user || (session.user as any).role !== 'ADMIN') {
    redirect('/');
  }

  return (
    <div className="flex min-h-screen bg-[#FAF9F6]">
      <AdminSidebar />
      <main className="flex-grow p-8 md:p-12 overflow-y-auto h-screen">
        {children}
      </main>
    </div>
  );
}
