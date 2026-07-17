<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Enums\TemplateAssetType;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('template_assets', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('template_id');

            $table->enum(
                'asset_type',
                array_column(TemplateAssetType::cases(), 'value')
            );

            $table->string('path');
            $table->string('original_name');
            $table->string('mime_type', 100);
            $table->string('extension', 20);

            $table->unsignedBigInteger('size');

            $table->unsignedSmallInteger('sort_order')->default(0);

            $table->timestamps();

            $table->index('template_id');
            $table->index('asset_type');
            $table->index(['template_id', 'asset_type']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('template_assets');
    }
};
