<?php

namespace Flamarkt\Categories\Event;

use Flamarkt\Categories\Category;
use Flamarkt\Core\Product\Product;
use Flarum\User\User;

class ProductCategoriesUpdated
{
    /**
     * @var Category[]
     */
    public array $oldCategories;

    public function __construct(
        public Product $product,
        public User    $actor,
        array          $oldCategories = []
    )
    {
        $this->oldCategories = $oldCategories;
    }
}
