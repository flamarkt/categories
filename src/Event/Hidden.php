<?php

namespace Flamarkt\Categories\Event;

use Flamarkt\Categories\Category;
use Flarum\User\User;

class Hidden
{
    public $category;
    public $actor;

    public function __construct(Category $category, User $actor = null)
    {
        $this->category = $category;
        $this->actor = $actor;
    }
}
