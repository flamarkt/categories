<?php

namespace Flamarkt\Categories\Listeners;

use Flamarkt\Categories\Category;
use Flamarkt\Core\Product\Event\Saving;

class SaveProduct
{
    public function handle(Saving $event)
    {
        if (isset($event->data['relationships']['categories']['data'])) {
            $event->actor->assertCan('backoffice');

            $linkage = (array)$event->data['relationships']['categories']['data'];

            $newCategoryIds = [];

            foreach ($linkage as $link) {
                $newCategoryIds[] = (int)$link['id'];
            }

            $newTags = Category::whereIn('id', $newCategoryIds)->get();

            //TODO
            $event->product->afterSave(function ($product) use ($newCategoryIds) {
                $product->categories()->sync($newCategoryIds);
            });
        }
    }
}
