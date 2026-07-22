<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Services\CartService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Throwable;
use App\Http\Requests\Cart\AddToCartRequest;
use App\Http\Resources\CartResource;

class CartController extends Controller
{
    public function __construct(
        protected CartService $cartService
    ) {}

    /**
     * Display the current user's cart.
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $cart = $this->cartService->getCart(
                $request->user()->id
            );

            return ApiResponse::success(
                new CartResource($cart),
                'Cart retrieved successfully.'
            );
        } catch (Throwable $e) {
            return ApiResponse::error(
                'Failed to retrieve cart.',
                500
            );
        }
    }

    /**
     * Add a template to cart.
     */
    public function store(AddToCartRequest $request): JsonResponse
    {
        $cart = $this->cartService->addTemplate(
            $request->user()->id,
            $request->template_id
        );

        return ApiResponse::success(
            new CartResource($cart),
            'Template added to cart successfully.'
        );
    }

    /**
     * Remove a template from cart.
     */
    public function destroy(Request $request, int $templateId): JsonResponse
    {
        try {
            $cart = $this->cartService->removeTemplate(
                $request->user()->id,
                $templateId
            );

            return ApiResponse::success(
                new CartResource($cart),
                'Template removed from cart successfully.'
            );
        } catch (Throwable $e) {
            return ApiResponse::error(
                'Failed to remove template from cart.',
                500
            );
        }
    }

    /**
     * Remove all items from cart.
     */
    public function clear(Request $request): JsonResponse
    {
        try {
            $cart = $this->cartService->clearCart(
                $request->user()->id
            );

            return ApiResponse::success(
                new CartResource($cart),
                'Cart cleared successfully.'
            );
        } catch (Throwable $e) {
            return ApiResponse::error(
                'Failed to clear cart.',
                500
            );
        }
    }
}
