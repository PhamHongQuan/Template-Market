<?php

namespace App\Http\Requests\Account;

use Illuminate\Foundation\Http\FormRequest;

class AvatarRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'avatar' => [
                'required',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:2048',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'avatar.required' => 'Avatar is required.',
            'avatar.image' => 'Avatar must be an image.',
            'avatar.mimes' => 'Avatar must be a file of type: jpg, jpeg, png, webp.',
            'avatar.max' => 'Avatar must not exceed 2MB.',
        ];
    }
}
