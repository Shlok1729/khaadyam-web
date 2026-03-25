import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });

    try {
        const favorites = await (prisma as any).favorite.findMany({
            where: { userId: parseInt((session.user as any).id) },
            include: { product: true }
        });
        return NextResponse.json(favorites);
    } catch (error: any) {
        console.error("Fetch favorites error:", error);
        return new NextResponse(error.message || "Internal Error", { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });

    try {
        const { productId } = await req.json();
        const favorite = await (prisma as any).favorite.create({
            data: {
                userId: parseInt((session.user as any).id),
                productId
            }
        });
        return NextResponse.json(favorite);
    } catch (error: any) {
        console.error("Add favorite error:", error);
        return new NextResponse(error.message || "Internal Error", { status: 500 });
    }
}

export async function DELETE(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });

    try {
        const { searchParams } = new URL(req.url);
        const productId = searchParams.get("productId");
        if (!productId) return new NextResponse("Missing productId", { status: 400 });

        await (prisma as any).favorite.delete({
            where: {
                userId_productId: {
                    userId: parseInt((session.user as any).id),
                    productId: parseInt(productId)
                }
            }
        });
        return new NextResponse("Deleted", { status: 200 });
    } catch (error: any) {
        console.error("Delete favorite error:", error);
        return new NextResponse(error.message || "Internal Error", { status: 500 });
    }
}
