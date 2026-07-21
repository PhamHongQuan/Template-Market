import { create } from "zustand";

export interface BasicInformationForm {
  category_id: number | null;
  title: string;
  description: string;
  price: number;
  status: "draft" | "published";
}

interface UploadTemplateState {
  // Basic Information
  basic: BasicInformationForm;

  // Assets
  thumbnail: File | null;
  previews: File[];
  source: File | null;

  // Nếu đã tạo template thì lưu id
  templateId: number | null;

  // Loading
  loading: boolean;

  // Actions
  setBasic: (data: Partial<BasicInformationForm>) => void;

  setThumbnail: (file: File | null) => void;

  setPreviews: (files: File[]) => void;

  addPreview: (file: File) => void;

  removePreview: (index: number) => void;

  setSource: (file: File | null) => void;

  setTemplateId: (id: number | null) => void;

  setLoading: (loading: boolean) => void;

  reset: () => void;
}

const initialBasic: BasicInformationForm = {
  category_id: null,
  title: "",
  description: "",
  price: 0,
  status: "draft",
};

export const useUploadTemplateStore = create<UploadTemplateState>((set) => ({
  basic: initialBasic,

  thumbnail: null,

  previews: [],

  source: null,

  templateId: null,

  loading: false,

  setBasic: (data) =>
    set((state) => ({
      basic: {
        ...state.basic,
        ...data,
      },
    })),

  setThumbnail: (file) =>
    set({
      thumbnail: file,
    }),

  setPreviews: (files) =>
    set({
      previews: files,
    }),

  addPreview: (file) =>
    set((state) => ({
      previews: [...state.previews, file],
    })),

  removePreview: (index) =>
    set((state) => ({
      previews: state.previews.filter((_, i) => i !== index),
    })),

  setSource: (file) =>
    set({
      source: file,
    }),

  setTemplateId: (id) =>
    set({
      templateId: id,
    }),

  setLoading: (loading) =>
    set({
      loading,
    }),

  reset: () =>
    set({
      basic: initialBasic,
      thumbnail: null,
      previews: [],
      source: null,
      templateId: null,
      loading: false,
    }),
}));
