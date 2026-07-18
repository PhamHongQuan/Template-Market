<?php

namespace App\Http\Requests\Category;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCategoryRequest extends FormRequest
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
        $category = $this->route('category');

        return [
            'parent_id' => [
                'nullable',
                'integer',
                'exists:categories,id',
                Rule::notIn([$category->id]),
            ],

            'name' => [
                'sometimes',
                'string',
                'max:100',
                Rule::unique('categories', 'name')->ignore($category->id),
            ],
        ];
    }

    /**
     * Custom validation messages.
     */
    public function messages(): array
    {
        return [
            'parent_id.exists' => 'Parent category does not exist.',

            'name.unique' => 'Category name already exists.',
            'name.max' => 'Category name may not be greater than 100 characters.',
        ];
    }

    /**
     * Custom attribute names.
     */
    public function attributes(): array
    {
        return [
            'parent_id' => 'parent category',
            'name' => 'category name',
        ];
    }
}
