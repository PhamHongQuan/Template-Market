import Swal from "sweetalert2";

export const alert = {
    success(title: string, text?: string) {
        return Swal.fire({
            icon: "success",
            title,
            text,
            confirmButtonText: "OK",
        });
    },

    error(title: string, text?: string) {
        return Swal.fire({
            icon: "error",
            title,
            text,
            confirmButtonText: "OK",
        });
    },

    warning(title: string, text?: string) {
        return Swal.fire({
            icon: "warning",
            title,
            text,
            confirmButtonText: "OK",
        });
    },

    info(title: string, text?: string) {
        return Swal.fire({
            icon: "info",
            title,
            text,
            confirmButtonText: "OK",
        });
    },

    confirm(title: string, text?: string) {
        return Swal.fire({
            icon: "question",
            title,
            text,
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel",
        });
    },
};