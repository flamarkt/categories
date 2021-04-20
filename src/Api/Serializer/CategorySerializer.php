<?php

namespace Flamarkt\Categories\Api\Serializer;

class CategorySerializer extends BasicCategorySerializer
{
    protected function getDefaultAttributes($category): array
    {
        $attributes = parent::getDefaultAttributes($category);

        $attributes += [
            'title' => $category->title,
            'description' => $category->description,
            'productCount' => $category->product_count,
        ];

        if ($this->actor->can('backoffice')) {
            $attributes += [
                'createdAt' => $this->formatDate($category->created_at),
                'updatedAt' => $this->formatDate($category->updated_at),
            ];
        }

        return $attributes;
    }
}
