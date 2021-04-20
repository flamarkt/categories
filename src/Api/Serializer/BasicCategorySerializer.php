<?php

namespace Flamarkt\Categories\Api\Serializer;

use Flamarkt\Categories\Category;
use Flarum\Api\Serializer\AbstractSerializer;

class BasicCategorySerializer extends AbstractSerializer
{
    protected $type = 'flamarkt-categories';

    /**
     * @param Category $category
     * @return array
     */
    protected function getDefaultAttributes($category): array
    {
        return [
            'title' => $category->title,
        ];
    }
}
