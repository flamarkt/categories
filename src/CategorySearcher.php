<?php

namespace Flamarkt\Categories;

use Flarum\Search\AbstractSearcher;
use Flarum\Search\GambitManager;
use Flarum\User\User;
use Illuminate\Database\Eloquent\Builder;

class CategorySearcher extends AbstractSearcher
{
    public function __construct(
        GambitManager                $gambits,
        array                        $searchMutators,
        protected CategoryRepository $repository
    )
    {
        parent::__construct($gambits, $searchMutators);
    }

    protected function getQuery(User $actor): Builder
    {
        return $this->repository->visibleTo($actor);
    }
}
