<?php

namespace App\Repositories\Interfaces;

use App\Models\CartItem;
use Illuminate\Database\Eloquent\Collection;

interface CartItemRepositoryInterface
{
    /**
     * Create a new item in the cart.
     */
    public function create(array $data): CartItem;

    /**
     * Find an item by its ID.
     */
    public function findById(int $id): ?CartItem;

    /**
     * Find an item by its cart and template IDs.
     */
    public function findByCartAndTemplate(
        int $cartId,
        int $templateId
    ): ?CartItem;

    /**
     * Get all items in the cart.
     */
    public function getByCartId(int $cartId): Collection;

    /**
     * Delete an item.
     */
    public function delete(int $id): bool;

    /**
     * Xóa theo cart và template.
     */
    public function deleteByCartAndTemplate(
        int $cartId,
        int $templateId
    ): bool;
}
