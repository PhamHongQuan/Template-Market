<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class OwnedTemplate extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'template_id',
        'order_item_id',
    ];

    /**
     * Get template owner.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get owned template.
     */
    public function template()
    {
        return $this->belongsTo(Template::class);
    }

    /**
     * Get purchased order item.
     */
    public function orderItem()
    {
        return $this->belongsTo(OrderItem::class);
    }
}
