import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProductView from "./ProductView";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default async function ProductPage(props: { params: Promise<{ id: string }> }) {
    const { id: idStr } = await props.params;
    const id = parseInt(idStr);
    
    if (isNaN(id)) notFound();

    const product = await prisma.product.findUnique({
        where: { id },
    });

    if (!product) notFound();

    const relatedProducts = await prisma.product.findMany({
        where: {
            category: product.category,
            NOT: { id: product.id },
        },
        take: 4,
    });

    return (
        <main className="min-h-screen bg-[#FAF9F6]">
            <Navbar />
            <div className="pt-24 pb-20">
                <ProductView product={product} relatedProducts={relatedProducts} />
            </div>
            <Footer />
        </main>
    );
}
