<?php

namespace Flamarkt\Categories;

use Flarum\Search\AbstractSearcher;
use Flarum\Search\GambitManager;
use Flarum\User\User;
use Illuminate\Database\Eloquent\Builder;

class CategorySearcher extends AbstractSearcher
{
    protected $repository;

    public function __construct(GambitManager $gambits, array $searchMutators, CategoryRepository $repository)
    {
        parent::__construct($gambits, $searchMutators);

        $this->repository = $repository;
    }

    protected function getQuery(User $actor): Builder
    {
        return $this->repository->visibleTo($actor);
    }
}
