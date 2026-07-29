"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";
import { CartItem, Product } from "@/types";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: "ADD_ITEM"; product: Product }
  | { type: "REMOVE_ITEM"; productId: string }
  | { type: "INCREMENT"; productId: string }
  | { type: "DECREMENT"; productId: string }
  | { type: "CLEAR" }
  | { type: "TOGGLE_CART" }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" };

const initialState: CartState = { items: [], isOpen: false };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.product.id === action.product.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.product.id === action.product.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { ...state, items: [...state.items, { product: action.product, quantity: 1 }] };
    }
    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter((i) => i.product.id !== action.productId) };
    case "INCREMENT":
      return {
        ...state,
        items: state.items.map((i) =>
          i.product.id === action.productId ? { ...i, quantity: i.quantity + 1 } : i
        ),
      };
    case "DECREMENT": {
      const item = state.items.find((i) => i.product.id === action.productId);
      if (item && item.quantity === 1) {
        return { ...state, items: state.items.filter((i) => i.product.id !== action.productId) };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.product.id === action.productId ? { ...i, quantity: i.quantity - 1 } : i
        ),
      };
    }
    case "CLEAR":
      return { ...state, items: [] };
    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen };
    case "OPEN_CART":
      return { ...state, isOpen: true };
    case "CLOSE_CART":
      return { ...state, isOpen: false };
    default:
      return state;
  }
}

interface CartContextType {
  state: CartState;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  increment: (productId: string) => void;
  decrement: (productId: string) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  totalItems: number;
  totalPrice: number;
  vat: number;
  subTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const totalItems = state.items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = state.items.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const vat = totalPrice * 0.15;
  const subTotal = totalPrice + vat;

  return (
    <CartContext.Provider
      value={{
        state,
        addItem: (p) => dispatch({ type: "ADD_ITEM", product: p }),
        removeItem: (id) => dispatch({ type: "REMOVE_ITEM", productId: id }),
        increment: (id) => dispatch({ type: "INCREMENT", productId: id }),
        decrement: (id) => dispatch({ type: "DECREMENT", productId: id }),
        clearCart: () => dispatch({ type: "CLEAR" }),
        toggleCart: () => dispatch({ type: "TOGGLE_CART" }),
        openCart: () => dispatch({ type: "OPEN_CART" }),
        closeCart: () => dispatch({ type: "CLOSE_CART" }),
        totalItems,
        totalPrice,
        vat,
        subTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
