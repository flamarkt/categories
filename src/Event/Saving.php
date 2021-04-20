<?php

namespace Flamarkt\Categories\Event;

use Flamarkt\Categories\Category;
use Flarum\User\User;

class Saving
{
    public $category;
    public $actor;
    public $data;

    public function __construct(Category $category, User $actor, array $data = [])
    {
        $this->category = $category;
        $this->actor = $actor;
        $this->data = $data;
    }
}
