<?php

namespace Flamarkt\Categories;

use Flarum\Api\Controller\ShowForumController;
use Flarum\Http\RequestUtil;
use Psr\Http\Message\ServerRequestInterface;

class LoadForumCategoryRelationship
{
    public function __invoke(ShowForumController $controller, &$data, ServerRequestInterface $request)
    {
        $actor = RequestUtil::getActor($request);

        $data['categories'] = Category::whereVisibleTo($actor)->get();
    }
}
