import api from "@/lib/axios";
import { ApiResponse } from "../types/api";
import { UpdatePasswordRequest, UpdateProfileRequest, User } from "../types/auth";

class userService {
  async updateProfile(data: UpdateProfileRequest) {
    const res = await api.put<ApiResponse<User>>("/account/", data);

    return res.data;
  }

  async updatePassword(data: UpdatePasswordRequest) {
    const res = await api.put<ApiResponse<User>>("/account/password", data);

    return res.data;
  }
}

export default new userService();
