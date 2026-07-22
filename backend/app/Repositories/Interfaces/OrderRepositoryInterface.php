<?php

namespace App\Repositories\Interfaces;

use App\Enums\OrderStatus;
use App\Models\Order;
use Illuminate\Database\Eloquent\Collection;

interface OrderRepositoryInterface
{
    /**
     * Create a new order.
     */
    public function create(array $data): Order;

    /**
     * Update an existing order.
     */
    public function update(int $id, array $data): Order;

    /**
     * Find an order by id.
     */
    public function findById(int $id): ?Order;

    /**
     * Find an order by order number.
     */
    public function findByOrderNumber(string $orderNumber): ?Order;

    /**
     * Get all orders of a user.
     */
    public function getByUserId(int $userId): Collection;

    /**
     * Update order status.
     */
    public function updateStatus(
        int $id,
        OrderStatus $status
    ): bool;

    /**
     * Load order relationships.
     */
    public function loadRelations(Order $order): Order;
}
