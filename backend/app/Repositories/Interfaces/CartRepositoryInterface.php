<?php

namespace App\Repositories\Interfaces;

use App\Models\Cart;

interface CartRepositoryInterface
{
    /**
     * Get cart by user ID.
     */
    public function getByUserId(int $userId): ?Cart;

    /**
     * Get or create cart.
     */
    public function getOrCreate(int $userId): Cart;

    /**
     * Create cart.
     */
    public function create(array $data): Cart;

    /**
     * Clear all items in the cart.
     */
    public function clear(int $cartId): bool;

    /**
     * Load all items in the cart.
     */
    public function loadItems(Cart $cart): Cart;
}
