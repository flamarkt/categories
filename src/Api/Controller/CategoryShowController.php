<?php

namespace Flamarkt\Categories\Api\Controller;

use Flamarkt\Categories\Api\Serializer\CategorySerializer;
use Flamarkt\Categories\CategoryRepository;
use Flarum\Api\Controller\AbstractShowController;
use Flarum\Http\RequestUtil;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class CategoryShowController extends AbstractShowController
{
    public $serializer = CategorySerializer::class;

    protected $repository;

    public function __construct(CategoryRepository $repository)
    {
        $this->repository = $repository;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        return $this->repository->findOrFail(Arr::get($request->getQueryParams(), 'id'), RequestUtil::getActor($request));
    }
}
