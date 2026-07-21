import api from "@/lib/axios";

import { ApiResponse } from "@/types/api";
import {
  CreateTemplateRequest,
  Template,
  UpdateTemplateRequest,
} from "@/types/template";

class TemplateService {
  async create(data: CreateTemplateRequest) {
    const res = await api.post<ApiResponse<Template>>("/templates", data);

    return res.data;
  }

  async update(id: number, data: UpdateTemplateRequest) {
    const res = await api.put<ApiResponse<Template>>(`/templates/${id}`, data);

    return res.data;
  }

  async getAll() {
    const res = await api.get<ApiResponse<Template[]>>("/templates");

    return res.data;
  }

  async getById(id: number) {
    const res = await api.get<ApiResponse<Template>>(`/templates/${id}`);

    return res.data;
  }

  async delete(id: number) {
    const res = await api.delete<ApiResponse<null>>(`/templates/${id}`);

    return res.data;
  }

  async getMyTemplates() {
    const res = await api.get<ApiResponse<Template[]>>("/templates/my");

    return res.data;
  }
}

export default new TemplateService();
