<?php

namespace Flamarkt\Categories;

use Flamarkt\Categories\Event\Saving;
use Flarum\Foundation\DispatchEventsTrait;
use Flarum\User\User;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Arr;

class CategoryRepository
{
    use DispatchEventsTrait;

    public function __construct(
        Dispatcher                  $events,
        protected CategoryValidator $validator
    )
    {
        $this->events = $events;
    }

    public function query(): Builder
    {
        return Category::query();
    }

    public function visibleTo(User $actor = null): Builder
    {
        $query = $this->query();

        if ($actor) {
            return $query->whereVisibleTo($actor);
        }

        return $query;
    }

    public function findOrFail($id, User $actor = null): Category
    {
        return $this->visibleTo($actor)->findOrFail($id);
    }

    public function save(Category $category, User $actor, array $data): Category
    {
        $attributes = Arr::get($data, 'data.attributes') ?? [];

        $relationships = Arr::get($data, 'data.relationships') ?? [];

        if (Arr::exists($relationships, 'parent')) {
            $attributes['parentId'] = Arr::get($relationships, 'parent.data.id');
        }

        // Set parent ID for slug uniqueness validation
        if (Arr::exists($attributes, 'parentId')) {
            $this->validator->setParentId($attributes['parentId']);
        } else {
            $this->validator->setParentId($category->parent_id);
        }

        $this->validator->setCategory($category);

        // Force validation on new records
        if (!$category->exists) {
            $attributes = array_merge([
                'slug' => '',
                'title' => '',
            ], $attributes);
        }

        $this->validator->assertValid($attributes);

        if (Arr::exists($attributes, 'parentId')) {
            $actor->assertCan('edit', $category);

            $category->parent()->associate($attributes['parentId']);
        }

        if (Arr::exists($attributes, 'slug')) {
            $actor->assertCan('edit', $category);

            $category->slug = Arr::get($attributes, 'slug');
        }

        if (Arr::exists($attributes, 'title')) {
            $actor->assertCan('edit', $category);

            $category->title = Arr::get($attributes, 'title');
        }

        if (Arr::exists($attributes, 'description')) {
            $actor->assertCan('edit', $category);

            $category->description = Arr::get($attributes, 'description') ?: '';
        }

        if (Arr::exists($attributes, 'priority')) {
            $actor->assertCan('edit', $category);

            $category->priority = (int)Arr::get($attributes, 'priority');
        }

        if (Arr::exists($attributes, 'isHidden')) {
            $actor->assertCan('hide', $category);

            if ($attributes['isHidden']) {
                $category->hide();
            } else {
                $category->restore();
            }
        }

        $this->events->dispatch(new Saving($category, $actor, $data));

        $category->save();

        $this->dispatchEventsFor($category, $actor);

        return $category;
    }

    public function store(User $actor, array $data): Category
    {
        $actor->assertCan('create', Category::class);

        return $this->save(new Category(), $actor, $data);
    }

    public function update(Category $category, User $actor, array $data): Category
    {
        return $this->save($category, $actor, $data);
    }

    public function delete(Category $category, User $actor): void
    {
        $actor->assertCan('delete', $category);

        $category->delete();
    }
}
