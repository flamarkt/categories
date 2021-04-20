<?php

namespace Flamarkt\Categories\Api\Controller;

use Flamarkt\Categories\CategoryRepository;
use Flarum\Api\Controller\AbstractDeleteController;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class CategoryDeleteController extends AbstractDeleteController
{
    protected $repository;

    public function __construct(CategoryRepository $repository)
    {
        $this->repository = $repository;
    }

    protected function delete(ServerRequestInterface $request)
    {
        $category = $this->repository->findOrFail(Arr::get($request->getQueryParams(), 'id'));

        $this->repository->delete($category);
    }
}
