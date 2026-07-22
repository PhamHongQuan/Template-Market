<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CartResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,

            'user_id' => $this->user_id,

            'item_count' => $this->items->count(),

            'total' => (float) $this->items->sum('price'),

            'items' => CartItemResource::collection(
                $this->items
            ),

            'created_at' => $this->created_at,

            'updated_at' => $this->updated_at,
        ];
    }
}
