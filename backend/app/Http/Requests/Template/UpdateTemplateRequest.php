<?php

namespace App\Http\Requests\Template;

use App\Enums\TemplateStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class UpdateTemplateRequest extends FormRequest
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
            'category_id' => [
                'sometimes',
                'integer',
                'exists:categories,id',
            ],

            'title' => [
                'sometimes',
                'string',
                'max:255',
            ],

            'description' => [
                'nullable',
                'string',
            ],

            'price' => [
                'sometimes',
                'numeric',
                'min:0',
            ],

            'status' => [
                'sometimes',
                new Enum(TemplateStatus::class),
            ],
        ];
    }

    /**
     * Custom validation messages.
     */
    public function messages(): array
    {
        return [
            'category_id.exists' => 'Category does not exist.',

            'title.max' => 'Template title may not be greater than 255 characters.',

            'price.numeric' => 'Price must be a number.',
            'price.min' => 'Price must be greater than or equal to 0.',
        ];
    }

    /**
     * Custom attribute names.
     */
    public function attributes(): array
    {
        return [
            'category_id' => 'category',
            'title' => 'template title',
            'description' => 'description',
            'price' => 'price',
            'status' => 'status',
        ];
    }
}
