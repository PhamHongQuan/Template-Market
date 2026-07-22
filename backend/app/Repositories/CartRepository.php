<?php

namespace App\Repositories;

use App\Models\Cart;
use App\Repositories\Interfaces\CartRepositoryInterface;

class CartRepository implements CartRepositoryInterface
{
    /**
     * Get cart by user ID.
     */
    public function getByUserId(int $userId): ?Cart
    {
        return Cart::with([
            'items.template.category',
            'items.template.assets',
        ])->where('user_id', $userId)->first();
    }

    /**
     * Get or create cart.
     */
    public function getOrCreate(int $userId): Cart
    {
        $cart = Cart::firstOrCreate([
            'user_id' => $userId,
        ]);

        return $this->loadItems($cart);
    }

    /**
     * Create cart.
     */
    public function create(array $data): Cart
    {
        return Cart::create($data);
    }

    /**
     * Clear all items in the cart.
     */
    public function clear(int $cartId): bool
    {
        $cart = Cart::findOrFail($cartId);

        return (bool) $cart->items()->delete();
    }

    /**
     * Load all items in the cart.
     */
    public function loadItems(Cart $cart): Cart
    {
        return $cart->load([
            'items.template.category',
            'items.template.assets',
        ]);
    }
}
