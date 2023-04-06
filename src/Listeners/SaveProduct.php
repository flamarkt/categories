<?php

namespace Flamarkt\Categories\Listeners;

use Flamarkt\Categories\Event\ProductCategoriesUpdated;
use Flamarkt\Core\Product\Event\Saving;
use Illuminate\Support\Arr;

class SaveProduct
{
    public function handle(Saving $event): void
    {
        $relationships = (array)Arr::get($event->data, 'data.relationships');

        if (Arr::exists($relationships, 'categories')) {
            $event->actor->assertCan('backoffice');

            $linkage = (array)Arr::get($relationships, 'categories.data');

            $newCategoryIds = [];

            foreach ($linkage as $link) {
                $newCategoryIds[] = (int)Arr::get($link, 'id');
            }

            $oldCategories = $event->product->categories()->get();

            $event->product->raise(
                new ProductCategoriesUpdated($event->product, $event->actor, $oldCategories->all())
            );

            $event->product->afterSave(function ($product) use ($newCategoryIds) {
                $product->categories()->sync($newCategoryIds);
                $product->unsetRelation('categories');
            });
        }
    }
}
