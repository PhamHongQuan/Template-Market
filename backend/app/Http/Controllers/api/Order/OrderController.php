<?php

namespace App\Http\Controllers\api\Order;

use App\Http\Controllers\Controller;
use App\Helpers\ApiResponse;
use App\Http\Requests\Order\CheckoutRequest;
use App\Http\Resources\OrderResource;
use App\Services\OrderService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Throwable;

class OrderController extends Controller
{
    public function __construct(
        protected OrderService $orderService
    ) {}

    /**
     * Checkout current user's cart.
     */
    public function checkout(
        CheckoutRequest $request
    ): JsonResponse {
        try {

            $order = $this->orderService->checkout(
                $request->user()->id
            );

            return ApiResponse::success(
                new OrderResource($order),
                'Checkout successfully.'
            );

        } catch (Throwable $e) {

            return ApiResponse::error(
                $e->getMessage(),
                500
            );
        }
    }


    /**
     * Display current user's orders.
     */
    public function index(
        Request $request
    ): JsonResponse {
        try {

            $orders = $this->orderService->getMyOrders(
                $request->user()->id
            );

            return ApiResponse::success(
                OrderResource::collection($orders),
                'Orders retrieved successfully.'
            );

        } catch (Throwable $e) {

            return ApiResponse::error(
                'Failed to retrieve orders.',
                500
            );
        }
    }


    /**
     * Display order detail.
     */
    public function show(
        Request $request,
        int $id
    ): JsonResponse {
        try {

            $order = $this->orderService->getOrder(
                $request->user()->id,
                $id
            );

            if (!$order) {
                return ApiResponse::error(
                    'Order not found.',
                    404
                );
            }

            return ApiResponse::success(
                new OrderResource($order),
                'Order retrieved successfully.'
            );

        } catch (Throwable $e) {

            return ApiResponse::error(
                'Failed to retrieve order.',
                500
            );
        }
    }


    /**
     * Cancel an order.
     */
    public function cancel(
        Request $request,
        int $id
    ): JsonResponse {
        try {

            $result = $this->orderService->cancel(
                $request->user()->id,
                $id
            );

            if (!$result) {
                return ApiResponse::error(
                    'Cannot cancel this order.',
                    400
                );
            }

            return ApiResponse::success(
                null,
                'Order cancelled successfully.'
            );

        } catch (Throwable $e) {

            return ApiResponse::error(
                'Failed to cancel order.',
                500
            );
        }
    }
}
