"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from "next-auth/react";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  weight: string;
}

interface CartContextType {
  cart: CartItem[];
  addItem: (product: any) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  totalItems: number;
  totalAmount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sync cart with DB if logged in
  useEffect(() => {
    if (session?.user) {
      const fetchCart = async () => {
        try {
          const res = await fetch("/api/cart");
          if (res.ok) {
            const data = await res.json();
            setCart(data);
          }
        } catch (err) {
          console.error("Failed to fetch cart", err);
        }
      };
      fetchCart();
    }
    // Note: We don't clear the cart here for guests anymore, 
    // allowing in-memory guest carts during the session.
  }, [session]);

  const addItem = async (product: any) => {
    // Optimistic update
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    if (session?.user) {
      try {
        await fetch("/api/cart", {
          method: "POST",
          body: JSON.stringify({ productId: product.id, quantity: 1 }),
        });
      } catch (err) {
        console.error("Failed to sync cart", err);
      }
    }
  };

  const removeItem = async (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    if (session?.user) {
      try {
        await fetch(`/api/cart?productId=${id}`, { method: "DELETE" });
      } catch (err) {
        console.error("Failed to sync cart removal", err);
      }
    }
  };

  const updateQuantity = async (id: number, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );

    if (session?.user) {
      try {
        await fetch("/api/cart", {
          method: "PATCH",
          body: JSON.stringify({ productId: id, delta }),
        });
      } catch (err) {
        console.error("Failed to sync quantity update", err);
      }
    }
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalItems,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
