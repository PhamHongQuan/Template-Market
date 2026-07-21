import api from "@/lib/axios";
import { ApiResponse } from "@/types/api";

class TemplateAssetService {
    async uploadThumbnail(
        templateId: number,
        file: File
    ) {
        const formData = new FormData();

        formData.append("file", file);

        const res = await api.post<ApiResponse<null>>(
            `/templates/${templateId}/thumbnail`,
            formData
        );

        return res.data;
    }

    async uploadPreview(
        templateId: number,
        files: File[]
    ) {
        const formData = new FormData();

        files.forEach((file) => {
            formData.append("files[]", file);
        });

        const res = await api.post<ApiResponse<null>>(
            `/templates/${templateId}/preview`,
            formData
        );

        return res.data;
    }

    async uploadSource(
        templateId: number,
        file: File
    ) {
        const formData = new FormData();

        formData.append("file", file);

        const res = await api.post<ApiResponse<null>>(
            `/templates/${templateId}/source`,
            formData
        );

        return res.data;
    }
}

export default new TemplateAssetService();