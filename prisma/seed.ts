import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

async function main() {
    console.log('Clearing old data... 🧹')
    await prisma.product.deleteMany()

    console.log('Start seeding Authentic Khaadyam Catalog... 🌿')

    const catalog = [
        // --- CHUTNEY ---
        {
            name: "Lime Chutney",
            price: 150,
            weight: "200g",
            description: "Zesty traditional lime chutney, perfectly balancing tang, spice, and sweetness. An excellent accompaniment for meals.",
            image: "https://images.unsplash.com/photo-1589112260481-9b1d9bf5c1f0?q=80&w=800",
            category: "Chutney",
            badge: "NEW",
            isBestOfMonth: true,
            isSoldOut: false
        },
        {
            name: "Red Chutney",
            price: 160,
            weight: "200g",
            description: "Fiery and flavorful red chutney made from selected dry chilies and indigenous spices.",
            image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=800",
            category: "Chutney",
            badge: "BEST SELLER",
            isBestOfMonth: false,
            isSoldOut: false
        },
        {
            name: "Ginger Chutney",
            price: 150,
            weight: "200g",
            description: "A robust and spicy ginger chutney. Known for its digestive benefits and sharp, comforting flavor.",
            image: "https://images.unsplash.com/photo-1615486171448-4cbabdd9cbfc?q=80&w=800",
            category: "Chutney",
            badge: null,
            isBestOfMonth: false,
            isSoldOut: false
        },
        {
            name: "Karindi Chutney",
            price: 80,
            weight: "200g",
            description: "Authentic Karindi chutney offering a unique regional taste profile.",
            image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=800",
            category: "Chutney",
            badge: null,
            isBestOfMonth: false,
            isSoldOut: false
        },
        {
            name: "Masala Khara",
            price: 90,
            weight: "100g",
            description: "A versatile spicy masala mix that elevates the flavor of any snack it touches.",
            image: "https://plus.unsplash.com/premium_photo-1664300346394-bb9f1a029312?q=80&w=800",
            category: "Chutney",
            badge: null,
            isBestOfMonth: false,
            isSoldOut: false
        },
        {
            name: "Tamarind Chutney",
            price: 140,
            weight: "200g",
            description: "Sweet and sour tamarind chutney, a staple dipping sauce for savory chaat.",
            image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=800",
            category: "Chutney",
            badge: null,
            isBestOfMonth: false,
            isSoldOut: false
        },
        {
            name: "Methi Chutney",
            price: 130,
            weight: "200g",
            description: "A deeply aromatic fenugreek (methi) chutney with a rich, slightly bitter traditional flavor.",
            image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=800",
            category: "Chutney",
            badge: null,
            isBestOfMonth: false,
            isSoldOut: false
        },
        {
            name: "Garlic Chutney",
            price: 50,
            weight: "100g",
            description: "Pungent and spicy dry garlic chutney powder. Adds a powerful kick to everyday meals.",
            image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=800",
            category: "Chutney",
            badge: "BEST SELLER",
            isBestOfMonth: true,
            isSoldOut: false
        },

        // --- CHATNIPUDI ---
        {
            name: "Groundnut Chatnipudi",
            price: 50,
            weight: "100g",
            description: "Classic stone-ground peanut chutney powder with dry red chilies. Highly addictive.",
            image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=800",
            category: "Chatnipudi",
            badge: "HERITAGE",
            isBestOfMonth: true,
            isSoldOut: false
        },
        {
            name: "Bengal Gram Chatnipudi",
            price: 60,
            weight: "100g",
            description: "Roasted lentil (chana dal) powder infused with coastal spices.",
            image: "https://plus.unsplash.com/premium_photo-1664300346394-bb9f1a029312?q=80&w=800",
            category: "Chatnipudi",
            badge: null,
            isBestOfMonth: false,
            isSoldOut: false
        },
        {
            name: "Niger Seede Chatnipudi",
            price: 60,
            weight: "100g",
            description: "Unique and highly nutritious Niger seed (Huchellu) chutney powder.",
            image: "https://plus.unsplash.com/premium_photo-1664300346394-bb9f1a029312?q=80&w=800",
            category: "Chatnipudi",
            badge: "HEALTH",
            isBestOfMonth: false,
            isSoldOut: false
        },
        {
            name: "Flax Seeds Chatnipudi",
            price: 60,
            weight: "100g",
            description: "Omega-3 rich roasted flax seed powder. A superfood addition to your plate.",
            image: "https://plus.unsplash.com/premium_photo-1664300346394-bb9f1a029312?q=80&w=800",
            category: "Chatnipudi",
            badge: "HEALTH",
            isBestOfMonth: false,
            isSoldOut: false
        },

        // --- POWDER ---
        {
            name: "Red Chilli Powder",
            price: 50,
            weight: "100g",
            description: "Pure, vibrant, and fiery red chili powder sourced from the finest farms.",
            image: "https://plus.unsplash.com/premium_photo-1664300346394-bb9f1a029312?q=80&w=800",
            category: "Powder",
            badge: null,
            isBestOfMonth: false,
            isSoldOut: false
        },
        {
            name: "Rasam Powder",
            price: 90,
            weight: "100g",
            description: "Our signature blend of warm spices for making the perfect aromatic South Indian Rasam.",
            image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=800",
            category: "Powder",
            badge: "BEST SELLER",
            isBestOfMonth: true,
            isSoldOut: false
        },
        {
            name: "Sambar Powder",
            price: 100,
            weight: "100g",
            description: "Traditional Udupi-style sambar powder roasted to perfection.",
            image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=800",
            category: "Powder",
            badge: null,
            isBestOfMonth: false,
            isSoldOut: false
        },

        // --- RICE MIXTURES ---
        {
            name: "Puliguare Mixture",
            price: 180,
            weight: "200g",
            description: "Authentic Puliyogare (Tamarind Rice) gojju base. Tangy, spicy, and deeply flavorful.",
            image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?q=80&w=800",
            category: "Rice Mixtures",
            badge: "BEST SELLER",
            isBestOfMonth: true,
            isSoldOut: false
        },
        {
            name: "Bise Bele Bath Mixture",
            price: 90,
            weight: "100g",
            description: "The classic Karnataka Bisi Bele Bath spice blend. Creates a rich, aromatic lentil and rice dish.",
            image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?q=80&w=800",
            category: "Rice Mixtures",
            badge: null,
            isBestOfMonth: false,
            isSoldOut: false
        },
        {
            name: "Vangi Bath Mixture",
            price: 90,
            weight: "100g",
            description: "Traditional spice powder for authentic Eggplant (Vangi) Rice.",
            image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=800",
            category: "Rice Mixtures",
            badge: null,
            isBestOfMonth: false,
            isSoldOut: false
        },

        // --- NUTRITION SUPPLEMENTS ---
        {
            name: "Badam Powder",
            price: 90,
            weight: "100g",
            description: "Rich and wholesome crushed almond powder. Perfect for blending into milk.",
            image: "https://images.unsplash.com/photo-1589113103553-495816c09f1f?q=80&w=800",
            category: "Nutrition Supliments",
            badge: "HEALTH",
            isBestOfMonth: true,
            isSoldOut: false
        },
        {
            name: "Ragi Malt",
            price: 60,
            weight: "100g",
            description: "An ancient grain powerhouse. Nutrient-dense finger millet powder for a healthy morning porridge.",
            image: "https://plus.unsplash.com/premium_photo-1664300346394-bb9f1a029312?q=80&w=800",
            category: "Nutrition Supliments",
            badge: "HEALTH",
            isBestOfMonth: false,
            isSoldOut: false
        },
        {
            name: "Multigrain Malt",
            price: 60,
            weight: "100g",
            description: "A balanced nutritional supplement combining multiple healthy grains and pulses.",
            image: "https://plus.unsplash.com/premium_photo-1664300346394-bb9f1a029312?q=80&w=800",
            category: "Nutrition Supliments",
            badge: "HEALTH",
            isBestOfMonth: false,
            isSoldOut: false
        },

        // --- PAPAD ---
        {
            name: "Rice Papad",
            price: 50,
            weight: "100g",
            description: "Crispy, light, and airy sun-dried rice crackers. Melts in the mouth.",
            image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800",
            category: "Papad",
            badge: null,
            isBestOfMonth: false,
            isSoldOut: false
        },
        {
            name: "Urad Dal Papad",
            price: 65,
            weight: "100g",
            description: "Classic spiced lentil papad with a delightful peppery kick.",
            image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800",
            category: "Papad",
            badge: "BEST SELLER",
            isBestOfMonth: false,
            isSoldOut: false
        },
        {
            name: "Green Gram Papad",
            price: 65,
            weight: "100g",
            description: "Healthy and crunchy papad made from nutritious moong dal.",
            image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800",
            category: "Papad",
            badge: "HEALTH",
            isBestOfMonth: false,
            isSoldOut: false
        },
        {
            name: "Multigrain Papad",
            price: 65,
            weight: "100g",
            description: "A hearty mix of grains crafted into a highly textured, spiced papad.",
            image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800",
            category: "Papad",
            badge: null,
            isBestOfMonth: false,
            isSoldOut: false
        },
        {
            name: "Sandige / Wafers",
            price: 60,
            weight: "100g",
            description: "Traditional handmade sun-dried wafers. Expands beautifully into a light crunch when fried.",
            image: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?q=80&w=800",
            category: "Papad",
            badge: "HERITAGE",
            isBestOfMonth: true,
            isSoldOut: true
        },

        // --- PICKLE ---
        {
            name: "Lime Pickle",
            price: 120,
            weight: "200g",
            description: "Classic lip-smacking lime pickle aged in cold-pressed oil with fiery spices.",
            image: "https://images.unsplash.com/photo-1589112260481-9b1d9bf5c1f0?q=80&w=800",
            category: "Pickle",
            badge: "BEST SELLER",
            isBestOfMonth: false,
            isSoldOut: false
        },
        {
            name: "Mango Pickle",
            price: 120,
            weight: "200g",
            description: "Spicy and tangy traditional raw mango pickle. The ultimate comfort food pairing.",
            image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=800",
            category: "Pickle",
            badge: "BEST SELLER",
            isBestOfMonth: true,
            isSoldOut: false
        },

        // --- SNACKS ---
        {
            name: "Chakkuli",
            price: 55,
            weight: "100g",
            description: "Crispy, circular, deeply traditional savory snacks made of rice flour and roasted urad dal.",
            image: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?q=80&w=800",
            category: "Snacks",
            badge: "BEST SELLER",
            isBestOfMonth: false,
            isSoldOut: false
        },
        {
            name: "Nipattu",
            price: 55,
            weight: "100g",
            description: "Flat, crispy rice crackers seasoned with peanuts, sesame seeds, and a spicy chili kick.",
            image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800",
            category: "Snacks",
            badge: "HERITAGE",
            isBestOfMonth: true,
            isSoldOut: false
        },
        {
            name: "Kodbale",
            price: 55,
            weight: "100g",
            description: "A beloved Karnataka snack. Crunchy, spicy rings infused with coconut and curry leaves.",
            image: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?q=80&w=800",
            category: "Snacks",
            badge: "BEST SELLER",
            isBestOfMonth: true,
            isSoldOut: false
        },
        {
            name: "Palak strips",
            price: 55,
            weight: "100g",
            description: "Savory ribbon strips packed with the iron-rich goodness of fresh spinach (palak).",
            image: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?q=80&w=800",
            category: "Snacks",
            badge: null,
            isBestOfMonth: false,
            isSoldOut: false
        },
        {
            name: "Karad kaddi",
            price: 55,
            weight: "100g",
            description: "Crispy, lightly spiced, traditional deep-fried savory sticks. The perfect tea-time companion.",
            image: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?q=80&w=800",
            category: "Snacks",
            badge: null,
            isBestOfMonth: false,
            isSoldOut: false
        }
    ]

    for (const item of catalog) {
        await prisma.product.create({
            data: item,
        })
    }

    console.log('Seeding finished! Your Khaadyam product catalog is live. ✨')
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
