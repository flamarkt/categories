<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->create('flamarkt_category_product', function (Blueprint $table) {
            $table->unsignedInteger('category_id');
            $table->unsignedInteger('product_id');
            $table->timestamps();

            $table->foreign('category_id')->references('id')->on('flamarkt_categories')->onDelete('cascade');
            $table->foreign('product_id')->references('id')->on('flamarkt_products')->onDelete('cascade');
        });
    },
    'down' => function (Builder $schema) {
        $schema->dropIfExists('flamarkt_category_product');
    },
];
