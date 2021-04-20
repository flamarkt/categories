<?php

namespace Flamarkt\Categories;

use Flarum\Filter\AbstractFilterer;
use Flarum\User\User;
use Illuminate\Database\Eloquent\Builder;

class CategoryFilterer extends AbstractFilterer
{
    protected $repository;

    public function __construct(array $filters, array $filterMutators, CategoryRepository $repository)
    {
        parent::__construct($filters, $filterMutators);

        $this->repository = $repository;
    }

    protected function getQuery(User $actor): Builder
    {
        return $this->repository->visibleTo($actor);
    }
}
