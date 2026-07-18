<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TemplateResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'description' => $this->description,
            'price' => $this->price,
            'status' => $this->status->value,
            'view_count' => $this->view_count,
            'download_count' => $this->download_count,
            'category' => CategoryResource::make(
                $this->whenLoaded('category')
            ),
            'thumbnail' => TemplateAssetResource::make(
                $this->whenLoaded('thumbnail')
            ),
            'source' => TemplateAssetResource::make(
                $this->whenLoaded('source')
            ),
            'previews' => TemplateAssetResource::collection(
                $this->whenLoaded('previews')
            ),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
