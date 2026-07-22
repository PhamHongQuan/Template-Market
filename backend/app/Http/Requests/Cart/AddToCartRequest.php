<?php

namespace App\Http\Requests\Cart;

use Illuminate\Foundation\Http\FormRequest;

class AddToCartRequest extends FormRequest
{
    /**
     * Determine whether the user can make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get validation rules.
     */
    public function rules(): array
    {
        return [
            'template_id' => [
                'required',
                'integer',
                'exists:templates,id',
            ],
        ];
    }

    /**
     * Get custom validation messages.
     */
    public function messages(): array
    {
        return [
            'template_id.required' => 'Template is required.',
            'template_id.integer' => 'Template id must be an integer.',
            'template_id.exists' => 'Template does not exist.',
        ];
    }
}
