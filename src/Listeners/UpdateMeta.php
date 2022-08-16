<?php

namespace Flamarkt\Categories\Listeners;

use Flamarkt\Categories\Event\ProductCategoriesUpdated;
use Illuminate\Support\Arr;

class UpdateMeta
{
    public function handle(ProductCategoriesUpdated $event)
    {
        $oldIds = Arr::pluck($event->oldCategories, 'id');
        $newIds = $event->product->categories->pluck('id')->all();

        $removed = array_diff($oldIds, $newIds);

        foreach ($event->oldCategories as $category) {
            if (in_array($category->id, $removed)) {
                $category->updateMeta()->save();
            }
        }

        $added = array_diff($newIds, $oldIds);

        foreach ($event->product->categories as $category) {
            if (in_array($category->id, $added)) {
                $category->updateMeta()->save();
            }
        }
    }
}
