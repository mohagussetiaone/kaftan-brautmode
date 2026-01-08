// app/utils/event-broadcast.ts
import type { CartItemForBroadcast } from "@/app/types/product.type";

export type CartAction = "ADD" | "REMOVE" | "UPDATE" | "UPDATE_OPTIONS" | "SELECT_ALL" | "REMOVE_SELECTED" | "CLEAR";

interface CartEventData {
  type: "CART_ACTION";
  action: CartAction;
  item?: CartItemForBroadcast;
  itemId?: string;
  quantity?: number;
  selectedItems?: string[];
}

interface AnimationEventData {
  type: "ANIMATION_TRIGGER";
  animationType?: "bounce" | "wave" | "fly";
}

interface PositionRequestEventData {
  type: "POSITION_REQUEST";
  requestId: string;
}

interface PositionResponseEventData {
  type: "POSITION_RESPONSE";
  requestId: string;
  targetId: string;
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

interface FlyingItemEventData {
  type: "FLYING_ITEM";
  item: {
    id: string;
    imageUrl: string;
    name: string;
  };
  startPosition: {
    x: number;
    y: number;
  };
  targetId: string;
}

type BroadcastEventData = CartEventData | AnimationEventData | PositionRequestEventData | PositionResponseEventData | FlyingItemEventData;

type AnimationCallback = () => void;
type PositionRequestCallback = (data: { requestId: string }) => void;
type PositionResponseCallback = (data: PositionResponseEventData) => void;
type FlyingItemCallback = (data: FlyingItemEventData) => void;
type CartActionCallback = (data: CartEventData) => void;

class EventBroadcaster {
  private channel: BroadcastChannel;
  private animationCallbacks: AnimationCallback[] = [];
  private positionRequestCallbacks: PositionRequestCallback[] = [];
  private positionResponseCallbacks: PositionResponseCallback[] = [];
  private flyingItemCallbacks: FlyingItemCallback[] = [];
  private cartActionCallbacks: CartActionCallback[] = [];

  constructor() {
    this.channel = new BroadcastChannel("cart-updates");
    this.setupMessageHandler();
  }

  private setupMessageHandler() {
    this.channel.onmessage = (event: MessageEvent) => {
      const data: BroadcastEventData = event.data;
      console.log("📡 Received broadcast event:", data);

      switch (data.type) {
        case "CART_ACTION":
          this.cartActionCallbacks.forEach((callback) => callback(data));
          break;
        case "ANIMATION_TRIGGER":
          this.animationCallbacks.forEach((callback) => callback());
          break;
        case "POSITION_REQUEST":
          this.positionRequestCallbacks.forEach((callback) => callback(data));
          break;
        case "POSITION_RESPONSE":
          this.positionResponseCallbacks.forEach((callback) => callback(data));
          break;
        case "FLYING_ITEM":
          this.flyingItemCallbacks.forEach((callback) => callback(data));
          break;
      }
    };
  }

  // Method untuk cart actions
  updateCart(action: CartAction, item?: CartItemForBroadcast, itemId?: string, quantity?: number, selectedItems?: string[]) {
    const eventData: CartEventData = {
      type: "CART_ACTION",
      action,
      item,
      itemId,
      quantity,
      selectedItems,
    };

    this.channel.postMessage(eventData);
    console.log("📡 Broadcasting cart event:", eventData);
  }

  // Method untuk trigger animasi
  triggerAnimation(animationType?: "bounce" | "wave" | "fly") {
    const eventData: AnimationEventData = {
      type: "ANIMATION_TRIGGER",
      animationType,
    };

    this.channel.postMessage(eventData);
    console.log("📡 Broadcasting animation trigger:", eventData);
  }

  // Method untuk meminta posisi cart
  sendPositionRequest(requestId: string) {
    const eventData: PositionRequestEventData = {
      type: "POSITION_REQUEST",
      requestId,
    };

    this.channel.postMessage(eventData);
    console.log("📡 Broadcasting position request:", eventData);
  }

  // Method untuk mengirim posisi cart
  sendCartPosition(data: {
    requestId: string;
    targetId: string;
    position: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
  }) {
    const eventData: PositionResponseEventData = {
      type: "POSITION_RESPONSE",
      requestId: data.requestId,
      targetId: data.targetId,
      position: data.position,
    };

    this.channel.postMessage(eventData);
    console.log("📡 Broadcasting cart position:", eventData);
  }

  // Method untuk animasi item terbang ke cart
  triggerFlyingItem(
    item: {
      id: string;
      imageUrl: string;
      name: string;
    },
    startPosition: {
      x: number;
      y: number;
    },
    targetId: string
  ) {
    const eventData: FlyingItemEventData = {
      type: "FLYING_ITEM",
      item,
      startPosition,
      targetId,
    };

    this.channel.postMessage(eventData);
    console.log("📡 Broadcasting flying item:", eventData);
  }

  // Listeners
  onCartAnimation(callback: AnimationCallback): () => void {
    this.animationCallbacks.push(callback);
    return () => {
      this.animationCallbacks = this.animationCallbacks.filter((cb) => cb !== callback);
    };
  }

  onCartPositionRequest(callback: PositionRequestCallback): () => void {
    this.positionRequestCallbacks.push(callback);
    return () => {
      this.positionRequestCallbacks = this.positionRequestCallbacks.filter((cb) => cb !== callback);
    };
  }

  onCartPositionResponse(callback: PositionResponseCallback): () => void {
    this.positionResponseCallbacks.push(callback);
    return () => {
      this.positionResponseCallbacks = this.positionResponseCallbacks.filter((cb) => cb !== callback);
    };
  }

  onFlyingItem(callback: FlyingItemCallback): () => void {
    this.flyingItemCallbacks.push(callback);
    return () => {
      this.flyingItemCallbacks = this.flyingItemCallbacks.filter((cb) => cb !== callback);
    };
  }

  onCartAction(callback: CartActionCallback): () => void {
    this.cartActionCallbacks.push(callback);
    return () => {
      this.cartActionCallbacks = this.cartActionCallbacks.filter((cb) => cb !== callback);
    };
  }

  // Method untuk mendengarkan semua event (compatibility dengan kode lama)
  listen(callback: (data: CartEventData) => void) {
    const unsubscribe = this.onCartAction(callback);
    return unsubscribe;
  }

  close() {
    this.channel.close();
    this.animationCallbacks = [];
    this.positionRequestCallbacks = [];
    this.positionResponseCallbacks = [];
    this.flyingItemCallbacks = [];
    this.cartActionCallbacks = [];
  }
}

export const eventBroadcaster = new EventBroadcaster();
