<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class TemplateAssetResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id'            => $this->id,
            'type'          => $this->asset_type->value,
            'original_name' => $this->original_name,
            'path'          => $this->path,
            'url'           => Storage::disk('s3')->url($this->path),
            'mime_type'     => $this->mime_type,
            'extension'     => $this->extension,
            'size'          => $this->size,
            'sort_order'    => $this->sort_order,
            'created_at'    => $this->created_at,
        ];
    }
}
