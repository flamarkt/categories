<?php

namespace Flamarkt\Categories\Gambit;

use Flarum\Filter\FilterInterface;
use Flarum\Filter\FilterState;
use Flarum\Search\AbstractRegexGambit;
use Flarum\Search\SearchState;
use Illuminate\Database\Query\Builder;

class ProductCategoryGambit extends AbstractRegexGambit implements FilterInterface
{
    protected function getGambitPattern(): string
    {
        return 'category:(.+)';
    }

    protected function conditions(SearchState $search, array $matches, $negate)
    {
        $this->constrain($search->getQuery(), $matches[1], $negate);
    }

    public function getFilterKey(): string
    {
        return 'category';
    }

    public function filter(FilterState $filterState, string $filterValue, bool $negate)
    {
        $this->constrain($filterState->getQuery(), $filterValue, $negate);
    }

    protected function constrain(Builder $query, $rawSlugs, $negate)
    {
        $slugs = explode(',', trim($rawSlugs, '"'));

        $query->where(function (Builder $query) use ($slugs, $negate) {
            foreach ($slugs as $slug) {
                if ($slug === 'uncategorized') {
                    $query->whereIn('flamarkt_products.id', function (Builder $query) {
                        $query->select('product_id')
                            ->from('flamarkt_category_product');
                    }, 'or', !$negate);
                } else {
                    // TODO: allow use of slugs instead of IDs and resolve it here
                    $id = $slug;

                    $query->whereIn('flamarkt_products.id', function (Builder $query) use ($id) {
                        $query->select('product_id')
                            ->from('flamarkt_category_product')
                            ->where('category_id', $id);
                    }, 'or', $negate);
                }
            }
        });
    }
}
