import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

async function main() {
    console.log('Start seeding Heritage Snacks... 🌿')

    const snacks = [
        {
            name: "Kai Muruku",
            price: 145,
            description: "Traditional hand-twisted crispy snacks made with premium rice flour and butter.",
            weight: "250g",
            image: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?q=80&w=800",
            badge: "BEST SELLER",
            isSoldOut: false
        },
        {
            name: "Millet Mixture",
            price: 180,
            description: "A healthy, crunchy blend of foxtail millets, peanuts, and curry leaves.",
            weight: "200g",
            image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=800",
            badge: null,
            isSoldOut: false
        },
        {
            name: "Besan Laddu",
            price: 220,
            description: "Rich, melt-in-your-mouth sweet spheres made with pure desi ghee.",
            weight: "250g",
            image: "https://images.unsplash.com/photo-1589113103553-495816c09f1f?q=80&w=800",
            badge: "NEW",
            isSoldOut: false
        },
        {
            name: "Shenga Chutney",
            price: 95,
            description: "Stone-ground peanut chutney powder with dry red chilies and garlic.",
            weight: "150g",
            image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=800",
            badge: null,
            isSoldOut: true
        },
        {
            name: "Special Malnad Nippattu",
            price: 160,
            description: "Spicy, deep-fried rice crackers, a signature staple of the Malnad region.",
            weight: "250g",
            image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800",
            badge: "HERITAGE",
            isSoldOut: false
        }
    ]

    for (const snack of snacks) {
        await prisma.product.create({
            data: snack,
        })
    }

    console.log('Seeding finished! Your Malnad pantry is full. ✨')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
