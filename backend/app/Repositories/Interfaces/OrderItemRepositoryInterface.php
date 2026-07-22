<?php

namespace App\Repositories\Interfaces;

use App\Models\OrderItem;
use Illuminate\Database\Eloquent\Collection;

interface OrderItemRepositoryInterface
{
    /**
     * Create a new order item.
     */
    public function create(array $data): OrderItem;

    /**
     * Create multiple order items.
     */
    public function createMany(array $items): void;

    /**
     * Find an order item by id.
     */
    public function findById(int $id): ?OrderItem;

    /**
     * Get all items of an order.
     */
    public function getByOrderId(int $orderId): Collection;

    /**
     * Delete an order item.
     */
    public function delete(int $id): bool;
}
