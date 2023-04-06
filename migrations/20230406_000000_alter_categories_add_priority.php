<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->table('flamarkt_categories', function (Blueprint $table) {
            $table->unsignedTinyInteger('priority')->index()->after('description');
        });
    },
    'down' => function (Builder $schema) {
        if (!$schema->hasColumn('flamarkt_categories', 'priority')) {
            return;
        }

        $schema->table('flamarkt_categories', function (Blueprint $table) {
            $table->dropColumn('priority');
        });
    },
];
