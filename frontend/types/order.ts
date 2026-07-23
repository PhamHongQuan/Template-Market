export interface OrderItem {
  id: number;
  template_id: number;
  title: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface Order {
  id: number;
  code: string;
  status: string;
  total: number;
  items: OrderItem[];
  created_at: string;
}

export interface CreateOrderRequest {
  payment_method?: string;
}
