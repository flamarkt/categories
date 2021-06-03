<?php

namespace Flamarkt\Categories\Api\Controller;

use Flamarkt\Categories\Api\Serializer\CategorySerializer;
use Flamarkt\Categories\CategoryRepository;
use Flarum\Api\Controller\AbstractShowController;
use Flarum\Http\RequestUtil;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class CategoryUpdateController extends AbstractShowController
{
    public $serializer = CategorySerializer::class;

    protected $repository;

    public function __construct(CategoryRepository $repository)
    {
        $this->repository = $repository;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);

        $product = $this->repository->findOrFail(Arr::get($request->getQueryParams(), 'id'), $actor);

        return $this->repository->update($product, $actor, $request->getParsedBody());
    }
}
