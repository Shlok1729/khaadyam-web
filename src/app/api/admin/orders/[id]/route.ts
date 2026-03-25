import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: idStr } = await params;
    const id = parseInt(idStr);

    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user as any).role !== "ADMIN") {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const { status } = await req.json();
        const order = await prisma.order.update({
            where: { id },
            data: { status }
        });
        return NextResponse.json(order);
    } catch (error: any) {
        console.error("Admin update order error:", error);
        return new NextResponse(error.message || "Internal Error", { status: 500 });
    }
}

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: idStr } = await params;
    const id = parseInt(idStr);

    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user as any).role !== "ADMIN") {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const order = await prisma.order.findUnique({
            where: { id },
            include: {
                user: true,
                orderItems: {
                    include: {
                        product: true
                    }
                }
            }
        });
        if (!order) return new NextResponse("Not Found", { status: 404 });
        return NextResponse.json(order);
    } catch (error: any) {
        console.error("Admin fetch order error:", error);
        return new NextResponse(error.message || "Internal Error", { status: 500 });
    }
}
