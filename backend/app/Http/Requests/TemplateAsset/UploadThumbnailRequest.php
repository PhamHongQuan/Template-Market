<?php

namespace App\Http\Requests\TemplateAsset;

use Illuminate\Foundation\Http\FormRequest;

class UploadThumbnailRequest extends FormRequest
{
    /**
     * Determine if the user is authorized.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Validation rules.
     */
    public function rules(): array
    {
        return [
            'file' => [
                'required',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:5120', // 5MB
            ],
        ];
    }

    /**
     * Custom validation messages.
     */
    public function messages(): array
    {
        return [
            'file.required' => 'Thumbnail is required.',
            'file.image' => 'The uploaded file must be an image.',
            'file.mimes' => 'Thumbnail must be a JPG, JPEG, PNG or WEBP image.',
            'file.max' => 'Thumbnail may not be larger than 5 MB.',
        ];
    }

    /**
     * Custom attribute names.
     */
    public function attributes(): array
    {
        return [
            'file' => 'thumbnail',
        ];
    }
}
