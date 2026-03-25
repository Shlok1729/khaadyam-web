import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });

    try {
        const addresses = await (prisma as any).address.findMany({
            where: { userId: parseInt((session.user as any).id) },
        });
        return NextResponse.json(addresses);
    } catch (error: any) {
        console.error("Fetch addresses error:", error);
        return new NextResponse(error.message || "Internal Error", { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });

    try {
        const body = await req.json();
        const address = await (prisma as any).address.create({
            data: {
                ...body,
                userId: parseInt((session.user as any).id),
            },
        });
        return NextResponse.json(address);
    } catch (error: any) {
        console.error("Create address error:", error);
        return new NextResponse(error.message || "Internal Error", { status: 500 });
    }
}
