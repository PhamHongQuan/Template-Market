<?php

namespace App\Repositories;

use App\Models\OrderItem;
use App\Repositories\Interfaces\OrderItemRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class OrderItemRepository implements OrderItemRepositoryInterface
{
    /**
     * Create a new order item.
     */
    public function create(array $data): OrderItem
    {
        return OrderItem::create($data);
    }

    /**
     * Create multiple order items.
     */
    public function createMany(array $items): void
    {
        OrderItem::insert($items);
    }

    /**
     * Find an order item by id.
     */
    public function findById(int $id): ?OrderItem
    {
        return OrderItem::with([
            'template.category',
            'template.thumbnail',
        ])->find($id);
    }

    /**
     * Get all items of an order.
     */
    public function getByOrderId(int $orderId): Collection
    {
        return OrderItem::with([
            'template.category',
            'template.thumbnail',
        ])
            ->where('order_id', $orderId)
            ->get();
    }

    /**
     * Delete an order item.
     */
    public function delete(int $id): bool
    {
        $item = OrderItem::find($id);

        if (!$item) {
            return false;
        }

        return (bool) $item->delete();
    }
}
