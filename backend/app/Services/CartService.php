<?php

namespace App\Services;

use App\Models\Cart;
use App\Repositories\Interfaces\CartItemRepositoryInterface;
use App\Repositories\Interfaces\CartRepositoryInterface;
use App\Repositories\Interfaces\TemplateRepositoryInterface;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use InvalidArgumentException;

class CartService
{
    public function __construct(
        protected CartRepositoryInterface $cartRepository,
        protected CartItemRepositoryInterface $cartItemRepository,
        protected TemplateRepositoryInterface $templateRepository,
    ) {}

    /**
     * Get current user's cart.
     */
    public function getCart(int $userId): Cart
    {
        return $this->cartRepository->getOrCreate($userId);
    }

    /**
     * Add template to cart.
     */
    public function addTemplate(int $userId, int $templateId): Cart
    {
        $cart = $this->cartRepository->getOrCreate($userId);

        $template = $this->templateRepository->findById($templateId);

        if (!$template) {
            throw new ModelNotFoundException('Template not found.');
        }

        // Prevent adding own template
        if ($template->user_id === $userId) {
            throw new InvalidArgumentException(
                'You cannot add your own template to cart.'
            );
        }

        // Prevent duplicate items
        $exists = $this->cartItemRepository->findByCartAndTemplate(
            $cart->id,
            $templateId
        );

        if ($exists) {
            return $this->cartRepository->loadItems($cart);
        }

        $this->cartItemRepository->create([
            'cart_id' => $cart->id,
            'template_id' => $template->id,
            'price' => $template->price,
        ]);

        return $this->cartRepository->getOrCreate($userId);
    }

    /**
     * Remove template from cart.
     */
    public function removeTemplate(
        int $userId,
        int $templateId
    ): Cart {
        $cart = $this->cartRepository->getOrCreate($userId);

        $this->cartItemRepository->deleteByCartAndTemplate(
            $cart->id,
            $templateId
        );

        return $this->cartRepository->getOrCreate($userId);
    }

    /**
     * Remove all items from cart.
     */
    public function clearCart(int $userId): Cart
    {
        $cart = $this->cartRepository->getOrCreate($userId);

        $this->cartRepository->clear($cart->id);

        return $this->cartRepository->getOrCreate($userId);
    }

    /**
     * Get cart total.
     */
    public function getTotal(int $userId): float
    {
        $cart = $this->cartRepository->getOrCreate($userId);

        return (float) $cart->items->sum('price');
    }

    /**
     * Get number of items in cart.
     */
    public function getItemCount(int $userId): int
    {
        $cart = $this->cartRepository->getOrCreate($userId);

        return $cart->items->count();
    }
}
