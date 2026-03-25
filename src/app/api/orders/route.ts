import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });

    try {
        const userId = parseInt((session.user as any).id);
        const orders = await (prisma as any).order.findMany({
            where: { userId },
            include: {
                orderItems: {
                    include: { product: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(orders);
    } catch (error: any) {
        console.error("Fetch orders error:", error);
        return new NextResponse(error.message || "Internal Error", { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });

    try {
        const { addressId, shippingAmount, totalAmount, paymentMethod, paymentStatus } = await req.json();
        const userId = parseInt((session.user as any).id);

        // 1. Get Cart Items from DB
        const cartItems = await (prisma as any).cartItem.findMany({
            where: { userId },
            include: { product: true }
        });

        if (cartItems.length === 0) {
            return new NextResponse("Your basket is empty", { status: 400 });
        }

        // 2. Get Selected Address
        const address = await (prisma as any).address.findUnique({
            where: { id: addressId, userId }
        });
        
        if (!address) {
            return new NextResponse("Please select a valid shipping address", { status: 400 });
        }

        // 3. Create Order and clear cart in a single transaction
        const order = await prisma.$transaction(async (tx) => {
            // Create the order
            const newOrder = await (tx as any).order.create({
                data: {
                    userId,
                    totalAmount,
                    shippingAmount: shippingAmount || 0,
                    paymentMethod: paymentMethod || "COD",
                    paymentStatus: paymentStatus || "UNPAID",
                    status: "PENDING",
                    shippingAddress: {
                        street: address.street,
                        city: address.city,
                        state: address.state,
                        zip: address.zip
                    },
                    orderItems: {
                        create: cartItems.map((item: any) => ({
                            productId: item.productId,
                            quantity: item.quantity,
                            price: item.product.price
                        }))
                    }
                }
            });

            // Delete cart items for this user
            await (tx as any).cartItem.deleteMany({
                where: { userId }
            });

            return newOrder;
        });

        return NextResponse.json(order);
    } catch (error: any) {
        console.error("Order creation error:", error);
        return new NextResponse(error.message || "Internal Error", { status: 500 });
    }
}
