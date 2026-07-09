<?php

namespace App\Http\Requests\Auth;
use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'email' => [
                'required',
                'email',
                'max:255',
            ],

            'password' => [
                'required',
                'string',
                'min:6',
                'max:255',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'email.required' => 'Email not be empty.',
            'email.email' => 'Email is not valid.',
            'email.max' => 'Email must not exceed 255 characters.',

            'password.required' => 'Password not be empty.',
            'password.min' => 'Password must be at least 6 characters.',
            'password.max' => 'Password must not exceed 255 characters.',
        ];
    }

    public function attributes(): array
    {
        return [
            'email' => 'email',
            'password' => 'password',
        ];
    }
}
