<?php

namespace Flamarkt\Categories\Api\Serializer;

use Tobscure\JsonApi\Relationship;

class CategorySerializer extends BasicCategorySerializer
{
    protected function getDefaultAttributes($category): array
    {
        $attributes = parent::getDefaultAttributes($category);

        $attributes += [
            'title' => $category->title,
            'description' => $category->description,
            'priority' => $category->priority,
            'productCount' => $category->product_count,
            'isRoot' => is_null($category->parent_id),
        ];

        if ($this->actor->can('backoffice')) {
            $attributes += [
                'createdAt' => $this->formatDate($category->created_at),
                'updatedAt' => $this->formatDate($category->updated_at),
            ];
        }

        if ($category->hidden_at) {
            $attributes['isHidden'] = true;

            if ($this->actor->can('backoffice')) {
                $attributes['hiddenAt'] = $this->formatDate($category->hidden_at);
            }
        }

        return $attributes;
    }

    public function parent($category): ?Relationship
    {
        return $this->hasOne($category, BasicCategorySerializer::class);
    }
}
