import api from "@/lib/axios";
import { ApiResponse } from "../types/api";
import { LoginRequest, RegisterRequest, LoginData, User } from "../types/auth";

class AuthService {
  async login(data: LoginRequest) {
    const res = await api.post<ApiResponse<LoginData>>("/auth/login", data);

    return res.data;
  }

  async register(data: RegisterRequest) {
    const res = await api.post<ApiResponse<User>>("/auth/register", data);

    return res.data;
  }

  async logout() {
    const res = await api.post<ApiResponse<null>>("/auth/logout");

    return res.data;
  }

  async me() {
    const res = await api.get<ApiResponse<User>>("/account/");

    return res.data;
  }

  googleLogin() {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google/redirect`;
  }
}

export default new AuthService();
