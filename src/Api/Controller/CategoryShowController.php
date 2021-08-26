<?php

namespace Flamarkt\Categories\Api\Controller;

use Flamarkt\Categories\Api\Serializer\CategorySerializer;
use Flamarkt\Categories\Category;
use Flamarkt\Categories\CategoryRepository;
use Flamarkt\Core\Product\Product;
use Flarum\Api\Controller\AbstractShowController;
use Flarum\Http\RequestUtil;
use Flarum\Http\SlugManager;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class CategoryShowController extends AbstractShowController
{
    public $serializer = CategorySerializer::class;

    public $include = [
        'parent',
    ];

    protected $slugManager;
    protected $repository;

    public function __construct(SlugManager $slugManager, CategoryRepository $repository)
    {
        $this->slugManager = $slugManager;
        $this->repository = $repository;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $id = Arr::get($request->getQueryParams(), 'id');
        $actor = RequestUtil::getActor($request);

        if (Arr::get($request->getQueryParams(), 'bySlug')) {
            return $this->slugManager->forResource(Category::class)->fromSlug($id, $actor);
        } else {
            return $this->repository->findOrFail($id, $actor);
        }
    }
}
