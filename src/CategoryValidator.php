<?php

namespace Flamarkt\Categories;

use Flarum\Foundation\AbstractValidator;
use Illuminate\Validation\Rule;

class CategoryValidator extends AbstractValidator
{
    protected ?Category $category;
    protected ?int $parentId;

    // Not used internally, but necessary for extensions using the Validator extender
    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category)
    {
        $this->category = $category;
    }

    // Not used internally, but necessary for extensions using the Validator extender
    public function getParentId(): ?int
    {
        return $this->parentId;
    }

    public function setParentId(?int $parentId): void
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
            'priority' => [
                'nullable',
                'integer',
                'min:0',
            ],
        ];
    }
}
