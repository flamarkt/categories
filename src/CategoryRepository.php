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

    protected $validator;

    public function __construct(Dispatcher $events, CategoryValidator $validator)
    {
        $this->events = $events;
        $this->validator = $validator;
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
        $attributes = Arr::get($data, 'data.attributes');

        $this->validator->assertValid($attributes);

        //TODO: permission for just admin stuff
        $category->title = Arr::get($attributes, 'title');
        $category->description = Arr::get($attributes, 'description');

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
        $actor->assertCan('edit', $category);

        return $this->save($category, $actor, $data);
    }

    public function delete(Category $category, User $actor)
    {
        $actor->assertCan('delete', $category);

        $category->delete();
    }
}
