import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function PATCH(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });

    try {
        const { name } = await req.json();
        const updatedUser = await (prisma as any).user.update({
            where: { id: parseInt((session.user as any).id) },
            data: { name }
        });
        return NextResponse.json(updatedUser);
    } catch (error: any) {
        console.error("Update user error:", error);
        return new NextResponse(error.message || "Internal Error", { status: 500 });
    }
}
