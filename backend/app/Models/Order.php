<?php

namespace App\Models;

use App\Enums\OrderStatus;
use App\Enums\PaymentMethod;
use App\Enums\PaymentStatus;
use App\Models\OrderItem;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'order_number',
        'subtotal',
        'discount',
        'total',
        'payment_method',
        'payment_status',
        'status',
        'paid_at',
    ];

    protected $casts = [
        'subtotal' => 'decimal:2',
        'discount' => 'decimal:2',
        'total' => 'decimal:2',

        'payment_method' => PaymentMethod::class,
        'payment_status' => PaymentStatus::class,
        'status' => OrderStatus::class,

        'paid_at' => 'datetime',
    ];

    /**
     * Get the owner of the order.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get all order items.
     */
    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
}
