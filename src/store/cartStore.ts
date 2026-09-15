import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  product_id: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (product_id: string, size: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (newItem) => set((state) => {
        const existing = state.items.find(i => i.product_id === newItem.product_id && i.size === newItem.size);
        if (existing) {
          return {
            items: state.items.map(i => 
              i.product_id === newItem.product_id && i.size === newItem.size 
                ? { ...i, quantity: i.quantity + newItem.quantity }
                : i
            )
          };
        }
        return { items: [...state.items, newItem] };
      }),
      removeItem: (product_id, size) => set((state) => ({
        items: state.items.filter(i => !(i.product_id === product_id && i.size === size))
      })),
      clearCart: () => set({ items: [] })
    }),
    { name: 'm2-cart-storage' }
  )
);
