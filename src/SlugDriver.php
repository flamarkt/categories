<?php

namespace Flamarkt\Categories;

use Flarum\Database\AbstractModel;
use Flarum\Http\SlugDriverInterface;
use Flarum\User\User;

class SlugDriver implements SlugDriverInterface
{
    protected $categories;

    public function __construct(CategoryRepository $categories)
    {
        $this->categories = $categories;
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
