<?php

namespace Flamarkt\Categories\Event;

use Flamarkt\Categories\Category;
use Flamarkt\Core\Product\Product;
use Flarum\User\User;

class ProductCategoriesUpdated
{
    public $product;
    public $actor;
    /**
     * @var Category[]
     */
    public $oldCategories;

    public function __construct(Product $product, User $actor, array $oldCategories = [])
    {
        $this->product = $product;
        $this->actor = $actor;
        $this->oldCategories = $oldCategories;
    }
}
