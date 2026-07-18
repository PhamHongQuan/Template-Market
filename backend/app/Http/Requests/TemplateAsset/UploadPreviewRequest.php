<?php

namespace App\Http\Requests\TemplateAsset;

use Illuminate\Foundation\Http\FormRequest;

class UploadPreviewRequest extends FormRequest
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
            'files' => [
                'required',
                'array',
                'min:1',
                'max:10',
            ],

            'files.*' => [
                'required',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:5120', // 5MB / image
            ],
        ];
    }

    /**
     * Custom validation messages.
     */
    public function messages(): array
    {
        return [
            'files.required' => 'At least one preview image is required.',
            'files.array' => 'Preview files must be an array.',
            'files.min' => 'Upload at least one preview image.',
            'files.max' => 'You can upload up to 10 preview images.',

            'files.*.required' => 'Preview image is required.',
            'files.*.image' => 'Each preview must be an image.',
            'files.*.mimes' => 'Preview images must be JPG, JPEG, PNG or WEBP.',
            'files.*.max' => 'Each preview image may not be larger than 5 MB.',
        ];
    }

    /**
     * Custom attribute names.
     */
    public function attributes(): array
    {
        return [
            'files' => 'preview images',
        ];
    }
}
