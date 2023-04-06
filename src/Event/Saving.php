<?php

namespace Flamarkt\Categories\Event;

use Flamarkt\Categories\Category;
use Flarum\User\User;

class Saving
{
    public function __construct(
        public Category $category,
        public User     $actor,
        public array    $data = []
    )
    {
    }
}
