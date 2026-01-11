This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# 🌿 Khaadyam Design System: Button Component Library

This document outlines the visual design language and technical implementation of the button components for the **Khaadyam** heritage e-commerce platform. The system is designed to balance traditional Malnad heritage with a modern, high-end digital shopping experience.

---

## 🎨 Design Language & Rationale

When presenting to the client, use these points to explain the "Heritage-Modern" aesthetic:

*   **The Primary Green (`#1a4332`)**: Used exclusively for "Money Actions" (Shop, Buy, Subscribe). This deep forest green represents the lush greenery of the Malnad region, establishing an immediate sense of organic trust, freshness, and nature.
*   **The Pill Shape**: We have opted for fully rounded "pill" shapes for the Hero and main landing sections. This makes the interface feel modern and approachable, while the lack of sharp edges mirrors the "soft," organic nature of handmade traditional foods.
*   **The Frosty/Glass Look**: Used for secondary actions (Explore, Learn More). By using a backdrop blur with semi-transparent white, we prevent the page from feeling "heavy." This allows the beautiful heritage background textures to peek through, creating a layered, premium feel.
*   **Micro-Interactions**: All buttons are programmed with an `active:scale-95` property. When a user clicks, the button physically shrinks by 5%. This mimics the tactile haptic feedback of a real-world shop, making the digital experience feel more "physical."
*   **Elevated Shadows**: We use "Floating Shadows" (`shadow-xl`) on primary buttons. This creates a 3D effect, making the call-to-action appear to float above the page, which subconsciously invites the user to interact and click.

---

## 💻 Technical Implementation (Tailwind CSS)

For developers, use the following utility classes to maintain brand consistency across the site.

| Button Type | Tailwind CSS Classes | Use Case |
| :--- | :--- | :--- |
| **Main Primary** | `bg-[#1a4332] text-white px-10 py-4 rounded-full font-bold hover:bg-[#143528] transition-all shadow-xl active:scale-95` | Hero CTAs, Newsletter |
| **Secondary Glass** | `bg-white/50 backdrop-blur-md text-neutral-800 border border-neutral-200 px-10 py-4 rounded-full font-bold hover:bg-white transition-all` | "Our Story", "Explore Recipes" |
| **Circular Utility** | `w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border border-neutral-100 hover:scale-110 transition-all` | Quick Add (+), Navigation Arrows |
| **Checkout/Add** | `bg-[#1a4332] text-white px-6 py-3 rounded-xl font-bold text-sm hover:shadow-lg active:scale-95 transition-all` | Product Grid "Buy Now" |

---

## 🛠 Usage Example (React/Next.js)

```tsx
// Example of a Primary Brand Button
<button className="bg-[#1a4332] text-white px-10 py-4 rounded-full font-bold hover:bg-[#143528] transition-all shadow-xl active:scale-95">
  Shop Bestsellers
</button>

// Example of a Glassmorphism Secondary Button
<button className="bg-white/50 backdrop-blur-md text-neutral-800 border border-neutral-200 px-10 py-4 rounded-full font-bold hover:bg-white transition-all">
  Our Journey
</button>