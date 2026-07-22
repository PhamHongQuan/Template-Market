<?php

namespace App\Http\Requests\Order;

use Illuminate\Foundation\Http\FormRequest;

class CheckoutRequest extends FormRequest
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
            'payment_method' => [
                'required',
                'string',
                'in:vnpay,momo,paypal,stripe',
            ],
        ];
    }

    /**
     * Get custom validation messages.
     */
    public function messages(): array
    {
        return [
            'payment_method.required' => 'Payment method is required.',
            'payment_method.in' => 'Invalid payment method.',
        ];
    }
}
