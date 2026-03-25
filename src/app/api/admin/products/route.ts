import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user as any).role !== "ADMIN") {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const body = await req.json();
        const product = await prisma.product.create({
            data: {
                ...body,
                price: parseFloat(body.price),
                images: body.images || []
            }
        });
        return NextResponse.json(product);
    } catch (error: any) {
        console.error("Admin create product error:", error);
        return new NextResponse(error.message || "Internal Error", { status: 500 });
    }
}
