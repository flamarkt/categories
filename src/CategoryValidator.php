<?php

namespace Flamarkt\Categories;

use Flarum\Foundation\AbstractValidator;

class CategoryValidator extends AbstractValidator
{
    protected $rules = [
        'title' => 'required|string|min:1|max:255',
        'description' => 'nullable|string|max:255',
    ];
}
