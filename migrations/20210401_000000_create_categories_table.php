<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->create('flamarkt_categories', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('parent_id')->nullable();
            $table->string('title');
            $table->text('description');
            $table->unsignedInteger('product_count');
            $table->timestamps();
            $table->timestamp('hidden_at');

            $table->foreign('parent_id')->references('id')->on('flamarkt_categories')->onDelete('set null');
        });
    },
    'down' => function (Builder $schema) {
        $schema->dropIfExists('flamarkt_categories');
    },
];
