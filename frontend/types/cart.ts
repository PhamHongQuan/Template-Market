export interface CartItem {
    id: number;
    price: number;
    created_at: string;

    template: {
        id: number;
        title: string;
        thumbnail: string;
        category: {
            id: number;
            name: string;
        };
    };
}

export interface Cart {
  id: number;
  items: CartItem[];
  total: number;
}

export interface AddToCartRequest {
  template_id: number;
  quantity?: number;
}

export interface UpdateCartItemRequest {
  quantity: number;
}
