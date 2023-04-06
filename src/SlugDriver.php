<?php

namespace Flamarkt\Categories;

use Flarum\Database\AbstractModel;
use Flarum\Http\SlugDriverInterface;
use Flarum\User\User;

class SlugDriver implements SlugDriverInterface
{
    public function __construct(
        protected CategoryRepository $categories
    )
    {
    }

    public function toSlug(AbstractModel $instance): string
    {
        return $instance->slug;
    }

    public function fromSlug(string $slug, User $actor): AbstractModel
    {
        return $this->categories->visibleTo($actor)->where('slug', $slug)->firstOrFail();
    }
}
