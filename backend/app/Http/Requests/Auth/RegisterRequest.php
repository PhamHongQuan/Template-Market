<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use App\Rules\RecaptchaRule;

class RegisterRequest extends FormRequest
{
    public function authorize(): bool {
        return true;
    }

    public function rules(): array {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            "recaptcha_token" => [
                "required",
                new RecaptchaRule(),
            ],
        ];
    }

    public function messages(): array {
        return [
            'name.required' => 'Name is required.',
            'name.string' => 'Name must be a string.',
            'name.max' => 'Name may not be greater than 255 characters.',
            'email.required' => 'Email is required.',
            'email.string' => 'Email must be a string.',
            'email.email' => 'Email is not a valid email address.',
            'email.max' => 'Email may not be greater than 255 characters.',
            'email.unique' => 'Email has already been taken.',
            'password.required' => 'Password is required.',
            'password.string' => 'Password must be a string.',
            'password.min' => 'Password must be at least 6 characters.',
            'recaptcha_token.required' => 'Captcha is required.',
        ];
    }
}
