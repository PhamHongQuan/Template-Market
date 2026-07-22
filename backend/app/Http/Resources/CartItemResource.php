<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CartItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        $thumbnail = optional(
            $this->template->assets
                ->where('asset_type', 'thumbnail')
                ->first()
        )->path;

        return [
            'id' => $this->id,

            'price' => (float) $this->price,

            'created_at' => $this->created_at,

            'template' => [
                'id' => $this->template->id,

                'title' => $this->template->title,

                'slug' => $this->template->slug,

                'price' => (float) $this->template->price,

                'thumbnail' => $thumbnail,

                'category' => [
                    'id' => $this->template->category->id,
                    'name' => $this->template->category->name,
                    'slug' => $this->template->category->slug,
                ],
            ],
        ];
    }
}
