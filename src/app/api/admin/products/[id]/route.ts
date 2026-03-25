import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

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
        const product = await prisma.product.findUnique({
            where: { id }
        });
        if (!product) return new NextResponse("Not Found", { status: 404 });
        return NextResponse.json(product);
    } catch (error: any) {
        return new NextResponse(error.message || "Internal Error", { status: 500 });
    }
}

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
        const body = await req.json();
        const product = await prisma.product.update({
            where: { id },
            data: {
                ...body,
                price: body.price ? parseFloat(body.price.toString()) : undefined,
            }
        });
        return NextResponse.json(product);
    } catch (error: any) {
        console.error("Admin update product error:", error);
        return new NextResponse(error.message || "Internal Error", { status: 500 });
    }
}

export async function DELETE(
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
        await prisma.product.delete({
            where: { id }
        });
        return new NextResponse("Deleted", { status: 200 });
    } catch (error: any) {
        console.error("Admin delete product error:", error);
        return new NextResponse(error.message || "Internal Error", { status: 500 });
    }
}
