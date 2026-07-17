<?php

namespace App\Models;

use App\Enums\TemplateAssetType;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TemplateAsset extends Model
{
    protected $fillable = [
        'template_id',
        'asset_type',
        'path',
        'original_name',
        'mime_type',
        'extension',
        'size',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'asset_type' => TemplateAssetType::class,
            'size' => 'integer',
            'sort_order' => 'integer',
        ];
    }

    public function template(): BelongsTo
    {
        return $this->belongsTo(Template::class);
    }
}
