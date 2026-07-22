<?php

use App\Enums\OrderStatus;
use App\Enums\PaymentMethod;
use App\Enums\PaymentStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;



return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('user_id');

            $table->string('order_number')->unique();

            $table->decimal('subtotal', 10, 2);

            $table->decimal('discount', 10, 2)->default(0);

            $table->decimal('total', 10, 2);

            $table->enum(
                'payment_method',
                array_column(PaymentMethod::cases(), 'value')
            );

            $table->enum(
                'payment_status',
                array_column(PaymentStatus::cases(), 'value')
            )->default(PaymentStatus::PENDING->value);

            $table->enum(
                'status',
                array_column(OrderStatus::cases(), 'value')
            )->default(OrderStatus::PENDING->value);

            $table->timestamp('paid_at')->nullable();

            $table->timestamps();

            $table->index('user_id');
            $table->index('order_number');
            $table->index('payment_status');
            $table->index('status');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
