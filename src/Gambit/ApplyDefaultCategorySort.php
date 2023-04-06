<?php

namespace Flamarkt\Categories\Gambit;

use Flarum\Filter\FilterState;
use Flarum\Query\QueryCriteria;

class ApplyDefaultCategorySort
{
    public function __invoke(FilterState $filterState, QueryCriteria $criteria): void
    {
        if (!$criteria->sortIsDefault) {
            return;
        }

        $filterState->getQuery()
            ->orderBy('parent_id')
            ->orderBy('priority', 'desc')
            ->orderBy('title');
    }
}
