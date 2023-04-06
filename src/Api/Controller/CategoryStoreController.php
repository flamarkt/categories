<?php

namespace Flamarkt\Categories\Api\Controller;

use Flamarkt\Categories\Api\Serializer\CategorySerializer;
use Flamarkt\Categories\CategoryRepository;
use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Http\RequestUtil;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class CategoryStoreController extends AbstractCreateController
{
    public $serializer = CategorySerializer::class;

    public $include = [
        'parent',
    ];

    public function __construct(
        protected CategoryRepository $repository
    )
    {
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        return $this->repository->store(RequestUtil::getActor($request), (array)$request->getParsedBody());
    }
}
