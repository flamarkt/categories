<?php

namespace Flamarkt\Categories\Event;

use Flamarkt\Categories\Category;
use Flarum\User\User;

class Restored
{
    public function __construct(
        public Category $category,
        public ?User    $actor = null
    )
    {
    }
}
