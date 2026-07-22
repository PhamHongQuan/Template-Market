<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,

            'price' => (float) $this->price,

            'template' => [
                'id' => $this->template->id,

                'title' => $this->template->title,

                'slug' => $this->template->slug,

                'description' => $this->template->description,

                'thumbnail' => optional(
                    $this->template->thumbnail
                )->path,

                'category' => [
                    'id' => $this->template->category->id,

                    'name' => $this->template->category->name,

                    'slug' => $this->template->category->slug,
                ],
            ],

            'created_at' => $this->created_at,
        ];
    }
}
