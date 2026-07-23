import api from "@/lib/axios";
import { ApiResponse } from "../types/api";
import { Order, CreateOrderRequest } from "../types/order";

class OrderService {
  async create(data: CreateOrderRequest) {
    const res = await api.post<ApiResponse<Order>>("/orders", data);

    return res.data;
  }

  async getOrders() {
    const res = await api.get<ApiResponse<Order[]>>("/orders");

    return res.data;
  }

  async getById(id: number) {
    const res = await api.get<ApiResponse<Order>>(`/orders/${id}`);

    return res.data;
  }
}

export default new OrderService();
