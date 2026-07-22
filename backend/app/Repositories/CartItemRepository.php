<?php

namespace App\Repositories;

use App\Models\CartItem;
use App\Repositories\Interfaces\CartItemRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class CartItemRepository implements CartItemRepositoryInterface
{
    /**
     * Create a new item in the cart.
     */
    public function create(array $data): CartItem
    {
        return CartItem::create($data);
    }

    /**
     * Find an item by its ID.
     */
    public function findById(int $id): ?CartItem
    {
        return CartItem::with([
            'template.category',
            'template.assets',
        ])->find($id);
    }

    /**
     * Find an item by its cart and template IDs.
     */
    public function findByCartAndTemplate(
        int $cartId,
        int $templateId
    ): ?CartItem {
        return CartItem::where('cart_id', $cartId)
            ->where('template_id', $templateId)
            ->first();
    }

    /**
     * Get all items in the cart.
     */
    public function getByCartId(int $cartId): Collection
    {
        return CartItem::with([
            'template.category',
            'template.assets',
        ])
            ->where('cart_id', $cartId)
            ->orderByDesc('created_at')
            ->get();
    }

    /**
     * Delete an item by its ID.
     */
    public function delete(int $id): bool
    {
        $item = CartItem::find($id);

        if (!$item) {
            return false;
        }

        return (bool) $item->delete();
    }

    /**
     * Delete an item by its cart and template IDs.
     */
    public function deleteByCartAndTemplate(
        int $cartId,
        int $templateId
    ): bool {
        return (bool) CartItem::where('cart_id', $cartId)
            ->where('template_id', $templateId)
            ->delete();
    }
}
