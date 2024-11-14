import { useState, createContext, useContext } from "react";

export type CartItemT = {
  product_id: string;
  product_quantity: number;
  product_size: "SMALL" | "MEDIUM" | "LARGE";
  product_name: string;
  product_image: string;
};

type CartContextT = {
  cartItems: CartItemT[];
  addToCart: (newItem: CartItemT) => void;
  clearCartItems: () => void;
};

const CartContext = createContext<CartContextT>({
  cartItems: [],
  addToCart: () => {},
  clearCartItems: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItemT[]>([]);

  const addToCart = (newItem: CartItemT) => {
    setCartItems((prev) => [...prev, newItem]);
  };

  const clearCartItems = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, clearCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
