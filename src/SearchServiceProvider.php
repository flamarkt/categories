<?php

namespace Flamarkt\Categories;

use Flarum\Foundation\AbstractServiceProvider;

class SearchServiceProvider extends AbstractServiceProvider
{
    public function register()
    {
        // Workaround for https://github.com/flarum/core/issues/2712
        $this->container->extend('flarum.simple_search.fulltext_gambits', function ($oldFulltextGambits) {
            $oldFulltextGambits[CategorySearcher::class] = Gambit\FullTextGambit::class;

            return $oldFulltextGambits;
        });
    }
}
