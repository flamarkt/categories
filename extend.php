<?php

namespace Flamarkt\Categories;

use Flamarkt\Core\Api as CoreApi;
use Flamarkt\Core\Product\Event\Saving;
use Flamarkt\Core\Product\Product;
use Flamarkt\Core\Product\ProductFilterer;
use Flamarkt\Core\Product\ProductSearcher;
use Flarum\Api\Controller\ShowForumController;
use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Extend;

return [
    (new Extend\Frontend('backoffice'))
        ->js(__DIR__ . '/js/dist/backoffice.js')
        //->css(__DIR__ . '/resources/less/backoffice.less')
        ->route('/categories', 'categories.index')
        ->route('/categories/{id:[0-9]+|new}', 'categories.show'),

    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/resources/less/forum.less')
        ->route('/categories', 'flamarkt.categories.index')
        ->route('/categories/{id}', 'flamarkt.categories.show'),

    new Extend\Locales(__DIR__ . '/resources/locale'),

    (new Extend\Routes('api'))
        ->get('/flamarkt/categories', 'flamarkt.categories.index', Api\Controller\CategoryIndexController::class)
        ->post('/flamarkt/categories', 'flamarkt.categories.store', Api\Controller\CategoryStoreController::class)
        ->get('/flamarkt/categories/{id}', 'flamarkt.categories.show', Api\Controller\CategoryShowController::class)
        ->patch('/flamarkt/categories/{id}', 'flamarkt.categories.update', Api\Controller\CategoryUpdateController::class)
        ->delete('/flamarkt/categories/{id}', 'flamarkt.categories.delete', Api\Controller\CategoryDeleteController::class),

    (new Extend\Model(Product::class))
        ->belongsToMany('categories', Category::class, 'flamarkt_category_product'),

    (new Extend\ApiSerializer(CoreApi\Serializer\ProductSerializer::class))
        ->hasMany('categories', Api\Serializer\BasicCategorySerializer::class),

    (new Extend\ApiSerializer(ForumSerializer::class))
        ->hasMany('categories', Api\Serializer\CategorySerializer::class),

    (new Extend\ApiController(CoreApi\Controller\ProductIndexController::class))
        ->addInclude('categories'),
    (new Extend\ApiController(CoreApi\Controller\ProductStoreController::class))
        ->addInclude('categories'),
    (new Extend\ApiController(CoreApi\Controller\ProductShowController::class))
        ->addInclude('categories'),
    (new Extend\ApiController(CoreApi\Controller\ProductUpdateController::class))
        ->addInclude('categories'),

    (new Extend\ApiController(ShowForumController::class))
        ->addInclude('categories.parent')
        ->prepareDataForSerialization(LoadForumCategoryRelationship::class),

    (new Extend\Event())
        ->listen(Saving::class, Listeners\SaveProduct::class)
        ->listen(Event\ProductCategoriesUpdated::class, Listeners\UpdateMeta::class),

    (new Extend\Filter(ProductFilterer::class))
        ->addFilter(Gambit\ProductCategoryGambit::class),
    (new Extend\SimpleFlarumSearch(ProductSearcher::class))
        ->addGambit(Gambit\ProductCategoryGambit::class),

    (new Extend\Filter(CategoryFilterer::class))
        ->addFilter(Gambit\NoOpFilter::class)
        ->addFilterMutator(Gambit\ApplyDefaultCategorySort::class),
    (new Extend\SimpleFlarumSearch(CategorySearcher::class))
        ->setFullTextGambit(Gambit\FullTextGambit::class),

    (new Extend\ModelUrl(Category::class))
        ->addSlugDriver('default', SlugDriver::class),

    (new Extend\Settings())
        ->serializeToForum('flamarktCategoriesListInSideNav', 'flamarkt-categories.listInSideNav', 'boolval')
        ->serializeToForum('flamarktCategoriesIndexInSideNav', 'flamarkt-categories.indexInSideNav', 'boolval')
        ->serializeToForum('flamarktCategoriesIndexInBreadcrumb', 'flamarkt-categories.indexInBreadcrumb', 'boolval'),
];
