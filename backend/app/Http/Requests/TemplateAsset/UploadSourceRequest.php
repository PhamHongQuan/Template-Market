<?php

namespace App\Http\Requests\TemplateAsset;

use Illuminate\Foundation\Http\FormRequest;

class UploadSourceRequest extends FormRequest
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
                'file',
                'mimes:zip',
                'max:512000', // 500MB
            ],
        ];
    }

    /**
     * Custom validation messages.
     */
    public function messages(): array
    {
        return [
            'file.required' => 'Source file is required.',
            'file.file' => 'The uploaded source file is invalid.',
            'file.mimes' => 'Source file must be a ZIP archive.',
            'file.max' => 'Source file may not be larger than 500 MB.',
        ];
    }

    /**
     * Custom attribute names.
     */
    public function attributes(): array
    {
        return [
            'file' => 'source file',
        ];
    }
}
