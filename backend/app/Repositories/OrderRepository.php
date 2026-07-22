<?php

namespace App\Repositories;

use App\Enums\OrderStatus;
use App\Models\Order;
use App\Repositories\Interfaces\OrderRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class OrderRepository implements OrderRepositoryInterface
{
    /**
     * Create a new order.
     */
    public function create(array $data): Order
    {
        return Order::create($data);
    }

    /**
     * Update an existing order.
     */
    public function update(int $id, array $data): Order
    {
        $order = Order::findOrFail($id);

        $order->update($data);

        return $this->loadRelations($order);
    }

    /**
     * Find an order by id.
     */
    public function findById(int $id): ?Order
    {
        return Order::with([
            'items.template.category',
            'items.template.thumbnail',
        ])->find($id);
    }

    /**
     * Find an order by order number.
     */
    public function findByOrderNumber(string $orderNumber): ?Order
    {
        return Order::with([
            'items.template.category',
            'items.template.thumbnail',
        ])->where('order_number', $orderNumber)
            ->first();
    }

    /**
     * Get all orders of a user.
     */
    public function getByUserId(int $userId): Collection
    {
        return Order::with([
            'items.template.category',
            'items.template.thumbnail',
        ])
            ->where('user_id', $userId)
            ->latest()
            ->get();
    }

    /**
     * Update order status.
     */
    public function updateStatus(
        int $id,
        OrderStatus $status
    ): bool {
        return (bool) Order::where('id', $id)
            ->update([
                'status' => $status,
            ]);
    }

    /**
     * Load order relationships.
     */
    public function loadRelations(Order $order): Order
    {
        return $order->load([
            'items.template.category',
            'items.template.thumbnail',
        ]);
    }
}
