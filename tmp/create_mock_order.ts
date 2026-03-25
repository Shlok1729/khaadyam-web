import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findFirst();
  const product = await prisma.product.findFirst();

  if (!user || !product) {
    console.log("User or Product not found. Please create them first.");
    return;
  }

  const order = await prisma.order.create({
    data: {
      userId: user.id,
      totalAmount: product.price * 2,
      status: "PENDING",
      shippingAddress: {
        street: "123 Malnad St",
        city: "Shimoga",
        state: "KA",
        zip: "577201"
      },
      orderItems: {
        create: {
          productId: product.id,
          quantity: 2,
          price: product.price
        }
      }
    }
  });

  console.log("Mock order created:", order.id);
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
