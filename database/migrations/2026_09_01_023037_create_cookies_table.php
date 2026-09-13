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
        Schema::create('cookies', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('image_url')->nullable();
            $table->integer('price_300ml')->default(35000);
            $table->integer('price_800ml')->default(90000);
            $table->integer('stock_300ml')->default(10);
            $table->integer('stock_800ml')->default(10);
            $table->boolean('is_available')->default(true);
            $table->string('badge')->nullable();
            $table->string('data_name')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cookies');
    }
};

