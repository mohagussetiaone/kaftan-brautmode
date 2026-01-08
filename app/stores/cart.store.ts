// app/stores/cart.store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SampleCartProductsType, Products, ColorOption, SizeOption, CartItemForBroadcast } from "@/app/types/product.type";
import { SAMPLE_CART_PRODUCTS } from "@/app/constants/product/product";
import { eventBroadcaster } from "@/app/utils/event-broadcast";

// Type untuk cart options
export interface CartOptions {
  color?: ColorOption;
  size?: SizeOption;
}

// Type untuk cart state
interface CartState {
  cartItems: SampleCartProductsType[];
  selectedItems: string[]; // cartItemId yang terpilih
  addToCart: (product: Products, quantity?: number, options?: CartOptions, fromBroadcast?: boolean) => void;
  removeFromCart: (cartItemId: string, fromBroadcast?: boolean) => void;
  updateQuantity: (cartItemId: string, quantity: number, fromBroadcast?: boolean) => void;
  updateOptions: (cartItemId: string, options: CartOptions, fromBroadcast?: boolean) => void;
  toggleSelectItem: (cartItemId: string, fromBroadcast?: boolean) => void;
  toggleSelectAll: (fromBroadcast?: boolean) => void;
  removeSelectedItems: (fromBroadcast?: boolean) => void;
  clearCart: (fromBroadcast?: boolean) => void;
  getSubtotal: () => number;
  getTax: () => number;
  getShipping: () => number;
  getTotal: () => number;
  getItemCount: () => number;
  getSelectedCount: () => number;
  isAllSelected: () => boolean;
  findCartItem: (productId: string, options?: CartOptions) => SampleCartProductsType | undefined;
  syncCart: (cartItems: SampleCartProductsType[], selectedItems: string[]) => void;
}

// Helper function untuk generate unique cart item ID
const generateCartItemId = (productId: string, options?: CartOptions): string => {
  let id = productId;
  if (options?.color?.id) {
    id += `-color-${options.color.id}`;
  }
  if (options?.size?.id) {
    id += `-size-${options.size.id}`;
  }
  return id;
};

// Helper function untuk calculate final price
const calculateFinalPrice = (basePrice: number, options?: CartOptions): number => {
  let finalPrice = basePrice;

  if (options?.color?.priceAdjustment) {
    finalPrice += options.color.priceAdjustment;
  }

  if (options?.size?.priceAdjustment) {
    finalPrice += options.size.priceAdjustment;
  }

  return finalPrice;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      cartItems: SAMPLE_CART_PRODUCTS,
      selectedItems: [],

      syncCart: (cartItems, selectedItems) => {
        console.log("🔄 Syncing cart from broadcast:", { cartItems, selectedItems });
        set({ cartItems, selectedItems });
      },

      addToCart: (product, quantity = 1, options, fromBroadcast = false) => {
        const state = get();

        // Generate cart item ID berdasarkan product dan options
        const cartItemId = generateCartItemId(product.id, options);

        // Hitung final price
        const finalPrice = calculateFinalPrice(product.basePrice, options);

        // Cek apakah item dengan kombinasi yang sama sudah ada di cart
        const existingItemIndex = state.cartItems.findIndex((item) => item.cartItemId === cartItemId);

        const minOrder = product.minOrder || 1;
        const initialQuantity = Math.max(minOrder, quantity || minOrder);

        let newCartItems: SampleCartProductsType[];
        let newSelectedItems: string[] = state.selectedItems;

        if (existingItemIndex !== -1) {
          // Update quantity jika item sudah ada
          newCartItems = [...state.cartItems];
          newCartItems[existingItemIndex] = {
            ...newCartItems[existingItemIndex],
            quantity: newCartItems[existingItemIndex].quantity + initialQuantity,
          };
        } else {
          // Buat item baru
          const newItem: SampleCartProductsType = {
            cartItemId,
            id: product.id,
            originalProductId: product.id,
            name: product.name,
            description: product.description || "",
            variant: product.variant || "",
            type: product.type || "",
            price: finalPrice,
            quantity: initialQuantity,
            minOrder: minOrder,
            image: product.image,
            categories: product.categories || [],
            selectedOptions: {
              color: options?.color,
              size: options?.size,
            },
          };

          newCartItems = [...state.cartItems, newItem];
          newSelectedItems = [...state.selectedItems, cartItemId];
        }

        console.log("🛒 Adding to cart:", {
          product,
          quantity,
          options,
          cartItemId,
          finalPrice,
          fromBroadcast,
        });

        set({
          cartItems: newCartItems,
          selectedItems: newSelectedItems,
        });

        if (!fromBroadcast) {
          const broadcastItem: CartItemForBroadcast = {
            id: product.id,
            name: product.name,
            description: product.description || "",
            price: finalPrice,
            quantity: initialQuantity,
            image: product.image,
            cartItemId,
            selectedOptions: options,
          };
          eventBroadcaster.updateCart("ADD", broadcastItem);
        }
      },

      removeFromCart: (cartItemId: string, fromBroadcast = false) => {
        const state = get();
        const newCartItems = state.cartItems.filter((item) => item.cartItemId !== cartItemId);
        const newSelectedItems = state.selectedItems.filter((id) => id !== cartItemId);

        console.log("🗑️ Removing from cart:", { cartItemId, fromBroadcast });
        set({
          cartItems: newCartItems,
          selectedItems: newSelectedItems,
        });

        if (!fromBroadcast) {
          eventBroadcaster.updateCart("REMOVE", undefined, cartItemId);
        }
      },

      updateQuantity: (cartItemId: string, quantity: number, fromBroadcast = false) => {
        const state = get();
        const itemIndex = state.cartItems.findIndex((item) => item.cartItemId === cartItemId);

        if (itemIndex === -1) return;

        const item = state.cartItems[itemIndex];
        const minOrder = item.minOrder || 1;
        let validatedQuantity = Math.max(minOrder, quantity);

        if (minOrder > 1) {
          validatedQuantity = Math.ceil(validatedQuantity / minOrder) * minOrder;
        }

        const newCartItems = [...state.cartItems];
        newCartItems[itemIndex] = {
          ...item,
          quantity: validatedQuantity,
        };

        console.log("📦 Updating quantity:", { cartItemId, quantity, validatedQuantity, fromBroadcast });
        set({ cartItems: newCartItems });

        if (!fromBroadcast) {
          const broadcastItem: CartItemForBroadcast = {
            id: item.id,
            name: item.name,
            description: item.description,
            price: item.price,
            quantity: validatedQuantity,
            image: item.image,
            cartItemId: item.cartItemId,
            selectedOptions: item.selectedOptions,
          };
          eventBroadcaster.updateCart("UPDATE", broadcastItem, cartItemId, validatedQuantity);
        }
      },

      updateOptions: (cartItemId: string, options, fromBroadcast = false) => {
        const state = get();
        const itemIndex = state.cartItems.findIndex((item) => item.cartItemId === cartItemId);

        if (itemIndex === -1) return;

        const item = state.cartItems[itemIndex];

        // Generate new cart item ID dengan options yang baru
        const newCartItemId = generateCartItemId(item.originalProductId, options);

        // Cek apakah item dengan kombinasi baru sudah ada
        const existingItemIndex = state.cartItems.findIndex((item) => item.cartItemId === newCartItemId && item.cartItemId !== cartItemId);

        let newCartItems: SampleCartProductsType[];

        if (existingItemIndex !== -1) {
          // Gabungkan quantity dengan item yang sudah ada
          newCartItems = [...state.cartItems];
          newCartItems[existingItemIndex] = {
            ...newCartItems[existingItemIndex],
            quantity: newCartItems[existingItemIndex].quantity + item.quantity,
          };
          // Hapus item lama
          newCartItems = newCartItems.filter((_, index) => index !== itemIndex);

          // Update selectedItems jika perlu
          const newSelectedItems = state.selectedItems.includes(cartItemId) ? [...state.selectedItems.filter((id) => id !== cartItemId), newCartItemId] : state.selectedItems;

          set({ selectedItems: newSelectedItems });
        } else {
          // Hitung new final price
          const productBasePrice = item.price - (item.selectedOptions?.color?.priceAdjustment || 0) - (item.selectedOptions?.size?.priceAdjustment || 0);

          const newFinalPrice = calculateFinalPrice(productBasePrice, options);

          // Update item dengan options baru
          newCartItems = [...state.cartItems];
          newCartItems[itemIndex] = {
            ...item,
            cartItemId: newCartItemId,
            price: newFinalPrice,
            selectedOptions: {
              color: options?.color,
              size: options?.size,
            },
          };

          // Update selectedItems jika perlu
          if (state.selectedItems.includes(cartItemId)) {
            const newSelectedItems = [...state.selectedItems.filter((id) => id !== cartItemId), newCartItemId];
            set({ selectedItems: newSelectedItems });
          }
        }

        console.log("🎨 Updating options:", { cartItemId, options, newCartItemId, fromBroadcast });
        set({ cartItems: newCartItems });

        if (!fromBroadcast) {
          const updatedItem = {
            ...item,
            cartItemId: newCartItemId,
            selectedOptions: options,
          };
          eventBroadcaster.updateCart("UPDATE_OPTIONS", updatedItem, cartItemId);
        }
      },

      findCartItem: (productId: string, options?: CartOptions) => {
        const state = get();
        const cartItemId = generateCartItemId(productId, options);
        return state.cartItems.find((item) => item.cartItemId === cartItemId);
      },

      toggleSelectItem: (cartItemId: string, fromBroadcast = false) => {
        const state = get();
        const isSelected = state.selectedItems.includes(cartItemId);

        const newSelectedItems = isSelected ? state.selectedItems.filter((id) => id !== cartItemId) : [...state.selectedItems, cartItemId];

        console.log("🔘 Toggling item selection:", { cartItemId, isSelected, fromBroadcast });
        set({ selectedItems: newSelectedItems });

        if (!fromBroadcast) {
          eventBroadcaster.updateCart("SELECT_ALL", undefined, undefined, undefined, newSelectedItems);
        }
      },

      toggleSelectAll: (fromBroadcast = false) => {
        const state = get();
        const allSelected = state.cartItems.length > 0 && state.selectedItems.length === state.cartItems.length;

        const newSelectedItems = allSelected ? [] : state.cartItems.map((item) => item.cartItemId);

        console.log("🔘 Toggling select all:", { allSelected, fromBroadcast });
        set({ selectedItems: newSelectedItems });

        if (!fromBroadcast) {
          eventBroadcaster.updateCart("SELECT_ALL", undefined, undefined, undefined, newSelectedItems);
        }
      },

      removeSelectedItems: (fromBroadcast = false) => {
        const state = get();
        const newCartItems = state.cartItems.filter((item) => !state.selectedItems.includes(item.cartItemId));

        console.log("🗑️ Removing selected items:", { count: state.selectedItems.length, fromBroadcast });
        set({
          cartItems: newCartItems,
          selectedItems: [],
        });

        if (!fromBroadcast) {
          eventBroadcaster.updateCart("REMOVE_SELECTED");
        }
      },

      clearCart: (fromBroadcast = false) => {
        console.log("🧹 Clearing cart:", { fromBroadcast });
        set({ cartItems: [], selectedItems: [] });

        if (!fromBroadcast) {
          eventBroadcaster.updateCart("CLEAR");
        }
      },

      getSubtotal: () => {
        const state = get();
        return state.cartItems.filter((item) => state.selectedItems.includes(item.cartItemId)).reduce((sum, item) => sum + item.price * item.quantity, 0);
      },

      getTax: () => {
        return get().getSubtotal() * 0.11;
      },

      getShipping: () => {
        const subtotal = get().getSubtotal();
        return subtotal > 100 ? 0 : 0;
      },

      getTotal: () => {
        const state = get();
        return state.getSubtotal() + state.getTax() + state.getShipping();
      },

      getItemCount: () => {
        const state = get();
        return state.cartItems.filter((item) => state.selectedItems.includes(item.cartItemId)).reduce((sum, item) => sum + item.quantity, 0);
      },

      getSelectedCount: () => {
        return get().selectedItems.length;
      },

      isAllSelected: () => {
        const state = get();
        return state.cartItems.length > 0 && state.selectedItems.length === state.cartItems.length;
      },
    }),
    {
      name: "cart-storage",
      onRehydrateStorage: () => {
        return (state, error) => {
          if (error) {
            console.error("Error during cart rehydration:", error);
          } else if (state) {
            console.log("Cart rehydrated:", state);
          }
        };
      },
    }
  )
);
