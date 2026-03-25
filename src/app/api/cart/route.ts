import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });

  try {
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: parseInt((session.user as any).id) },
      include: { product: true },
    });

    return NextResponse.json(
      cartItems.map((item) => ({
        ...item.product,
        quantity: item.quantity,
      }))
    );
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });

  try {
    const { productId, quantity } = await req.json();

    const cartItem = await prisma.cartItem.upsert({
      where: {
        userId_productId: {
          userId: parseInt((session.user as any).id),
          productId: productId,
        },
      },
      update: {
        quantity: { increment: quantity },
      },
      create: {
        userId: parseInt((session.user as any).id),
        productId: productId,
        quantity: quantity,
      },
    });

    return NextResponse.json(cartItem);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });

  try {
    const { productId, delta } = await req.json();

    const cartItem = await prisma.cartItem.update({
      where: {
        userId_productId: {
          userId: parseInt((session.user as any).id),
          productId: productId,
        },
      },
      data: {
        quantity: { increment: delta },
      },
    });

    return NextResponse.json(cartItem);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    if (!productId) return new NextResponse("Missing productId", { status: 400 });

    await prisma.cartItem.delete({
      where: {
        userId_productId: {
          userId: parseInt((session.user as any).id),
          productId: parseInt(productId),
        },
      },
    });

    return new NextResponse("Deleted", { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
