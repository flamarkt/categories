<?php

namespace Flamarkt\Categories;

use Flarum\Api\Controller\ShowForumController;
use Flarum\Http\RequestUtil;
use Flarum\Settings\SettingsRepositoryInterface;
use Psr\Http\Message\ServerRequestInterface;

class LoadForumCategoryRelationship
{
    public function __construct(
        protected SettingsRepositoryInterface $settings
    )
    {
    }

    public function __invoke(ShowForumController $controller, &$data, ServerRequestInterface $request): void
    {
        // Improve performance by not loading the categories if they aren't displayed on every page
        if (!$this->settings->get('flamarkt-categories.listInSideNav')) {
            return;
        }

        $actor = RequestUtil::getActor($request);

        $data['categories'] = Category::whereVisibleTo($actor)->get();
    }
}
