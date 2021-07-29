<?php

namespace Flamarkt\Categories;

use Flarum\Foundation\AbstractValidator;
use Illuminate\Validation\Rule;

class CategoryValidator extends AbstractValidator
{
    protected $category;
    protected $parentId;

    public function setCategory(Category $category)
    {
        $this->category = $category;
    }

    public function setParentId($parentId)
    {
        $this->parentId = $parentId;
    }

    protected function getRules(): array
    {
        $slugUnique = Rule::unique('flamarkt_categories', 'slug');

        if ($this->category) {
            $slugUnique->ignoreModel($this->category);
            $slugUnique->where('parent_id', $this->parentId);
        }

        return [
            'parentId' => [
                'nullable',
                'exists:flamarkt_categories,id',
            ],
            'slug' => [
                'required',
                $slugUnique,
            ],
            'title' => [
                'required',
                'string',
                'max:255',
            ],
            'description' => [
                'nullable',
                'string',
                'max:255',
            ],
        ];
    }
}
