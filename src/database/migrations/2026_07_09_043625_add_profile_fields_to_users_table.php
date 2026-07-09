<?php

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
        Schema::table('users', function (Blueprint $table) {
            $table->string('phone', 20)->nullable()->after('email');
            $table->string('avatar')->nullable()->after('phone');
            $table->text('bio')->nullable()->after('avatar');

            // 0: Customer | 1: Seller | 2: Admin
            $table->tinyInteger('role')->default(0)->after('password');

            // 0: Inactive | 1: Active | 2: Banned
            $table->tinyInteger('status')->default(1)->after('role');

            $table->timestamp('last_login_at')->nullable()->after('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'phone',
                'avatar',
                'bio',
                'role',
                'status',
                'last_login_at',
            ]);
        });
    }
};
