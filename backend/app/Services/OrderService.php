<?php

namespace App\Services;

use App\Enums\OrderStatus;
use App\Enums\PaymentStatus;
use App\Models\Order;
use App\Repositories\Interfaces\CartRepositoryInterface;
use App\Repositories\Interfaces\OrderRepositoryInterface;
use App\Repositories\Interfaces\OrderItemRepositoryInterface;
use App\Repositories\Interfaces\OwnedTemplateRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use RuntimeException;

class OrderService
{
    public function __construct(
        protected OrderRepositoryInterface $orderRepository,
        protected OrderItemRepositoryInterface $orderItemRepository,
        protected OwnedTemplateRepositoryInterface $ownedTemplateRepository,
        protected CartRepositoryInterface $cartRepository,
    ) {}

    /**
     * Create a new order from user's cart.
     */
    public function checkout(int $userId): Order
    {
        return DB::transaction(function () use ($userId) {

            $cart = $this->cartRepository->getOrCreate($userId);

            if ($cart->items->isEmpty()) {
                throw new RuntimeException(
                    'Cart is empty.'
                );
            }

            $subtotal = $cart->items->sum('price');

            // Create order
            $order = $this->orderRepository->create([
                'user_id' => $userId,

                'order_number' => $this->generateOrderNumber(),

                'subtotal' => $subtotal,

                'discount' => 0,

                'total' => $subtotal,

                'payment_method' => 'vnpay',

                'payment_status' => PaymentStatus::PAID,

                'status' => OrderStatus::COMPLETED,

                'paid_at' => now(),
            ]);


            foreach ($cart->items as $item) {

                // Create order item
                $orderItem = $this->orderItemRepository->create([
                    'order_id' => $order->id,

                    'template_id' => $item->template_id,

                    'price' => $item->price,
                ]);


                // Create owned template
                $exists = $this->ownedTemplateRepository->exists(
                    $userId,
                    $item->template_id
                );


                if (!$exists) {

                    $this->ownedTemplateRepository->create([
                        'user_id' => $userId,

                        'template_id' => $item->template_id,

                        'order_item_id' => $orderItem->id,
                    ]);
                }
            }


            // Clear cart after checkout
            $this->cartRepository->clear(
                $cart->id
            );


            return $this->orderRepository->findById(
                $order->id
            );
        });
    }


    /**
     * Get user's orders.
     */
    public function getMyOrders(int $userId): Collection
    {
        return $this->orderRepository
            ->getByUserId($userId);
    }


    /**
     * Get order detail.
     */
    public function getOrder(
        int $userId,
        int $orderId
    ): ?Order {

        $order = $this->orderRepository
            ->findById($orderId);


        if (!$order) {
            return null;
        }


        if ($order->user_id !== $userId) {
            return null;
        }


        return $order;
    }


    /**
     * Cancel an order.
     */
    public function cancel(
        int $userId,
        int $orderId
    ): bool {

        $order = $this->getOrder(
            $userId,
            $orderId
        );


        if (!$order) {
            return false;
        }


        if (
            $order->status !== OrderStatus::PENDING
        ) {
            return false;
        }


        return $this->orderRepository
            ->updateStatus(
                $orderId,
                OrderStatus::CANCELLED
            );
    }


    /**
     * Generate unique order number.
     */
    private function generateOrderNumber(): string
    {
        return 'ORD-' .
            now()->format('YmdHis') .
            '-' .
            strtoupper(
                Str::random(6)
            );
    }
}
