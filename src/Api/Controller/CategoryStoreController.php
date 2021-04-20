<?php

namespace Flamarkt\Categories\Api\Controller;

use Flamarkt\Categories\Api\Serializer\CategorySerializer;
use Flamarkt\Categories\CategoryRepository;
use Flarum\Api\Controller\AbstractCreateController;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class CategoryStoreController extends AbstractCreateController
{
    public $serializer = CategorySerializer::class;

    protected $repository;

    public function __construct(CategoryRepository $repository)
    {
        $this->repository = $repository;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        return $this->repository->store($request->getAttribute('actor'), $request->getParsedBody());
    }
}
