export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    avatar: string | null;
    bio: string;
    email_verified_at: string | null;
    role: number;
    status: number;
    last_login_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface LoginData {
    access_token: string;
    token_type: string;
    user: User;
}

export interface UpdateProfileRequest {
    name: string;
    email: string;
    phone: string;
    bio: string;
}

export interface UpdatePasswordRequest {
    current_password: string;
    password: string;
}

export interface ForgotPasswordRequest {
    email: string;
}

export interface ResetPasswordRequest {
    email: string;
    token: string;
    password: string;
    password_confirmation: string;
}