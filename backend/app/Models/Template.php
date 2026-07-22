<?php

namespace App\Models;

use App\Enums\TemplateAssetType;
use App\Enums\TemplateStatus;
use App\Models\CartItem;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Template extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'category_id',
        'title',
        'slug',
        'description',
        'price',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'status' => TemplateStatus::class,
            'view_count' => 'integer',
            'download_count' => 'integer',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function assets(): HasMany
    {
        return $this->hasMany(TemplateAsset::class);
    }


    public function thumbnail(): HasOne
    {
        return $this->hasOne(TemplateAsset::class)
            ->where('asset_type', TemplateAssetType::THUMBNAIL);
    }

    public function source(): HasOne
    {
        return $this->hasOne(TemplateAsset::class)
            ->where('asset_type', TemplateAssetType::SOURCE);
    }

    public function previews(): HasMany
    {
        return $this->hasMany(TemplateAsset::class)
            ->where('asset_type', TemplateAssetType::PREVIEW)
            ->orderBy('sort_order');
    }

    public function cartItems()
    {
        return $this->hasMany(CartItem::class);
    }
}
