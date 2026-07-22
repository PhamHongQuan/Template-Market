<?php

namespace App\Models;

use App\Models\OwnedTemplate;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'template_id',
        'price',
    ];

    protected $casts = [
        'price' => 'decimal:2',
    ];

    /**
     * Get the parent order.
     */
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    /**
     * Get purchased template.
     */
    public function template()
    {
        return $this->belongsTo(Template::class);
    }

    /**
     * Get owned template record.
     */
    public function ownedTemplate()
    {
        return $this->hasOne(OwnedTemplate::class);
    }
}
