<?php

namespace Flamarkt\Categories\Gambit;

use Flarum\Filter\FilterInterface;
use Flarum\Filter\FilterState;

class NoOpFilter implements FilterInterface
{
    public function getFilterKey(): string
    {
        return 'noop';
    }

    public function filter(FilterState $filterState, string $filterValue, bool $negate)
    {
        // Does nothing on purpose. We can't register the filtrer without a filter.
    }
}
