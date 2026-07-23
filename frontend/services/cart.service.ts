import api from "@/lib/axios";
import { ApiResponse } from "../types/api";
import { Cart, AddToCartRequest, UpdateCartItemRequest } from "../types/cart";

class CartService {
  async getCart() {
    const res = await api.get<ApiResponse<Cart>>("/cart");

    return res.data;
  }

  async addToCart(data: AddToCartRequest) {
    const res = await api.post<ApiResponse<Cart>>("/cart/items", data);

    return res.data;
  }

  async updateItem(id: number, data: UpdateCartItemRequest) {
    const res = await api.put<ApiResponse<Cart>>(`/cart/items/${id}`, data);

    return res.data;
  }

  async removeItem(id: number) {
    const res = await api.delete<ApiResponse<Cart>>(`/cart/items/${id}`);

    return res.data;
  }

  async clearCart() {
    const res = await api.delete<ApiResponse<null>>("/cart/clear");

    return res.data;
  }
}

export default new CartService();
