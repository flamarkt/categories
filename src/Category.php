<?php

namespace Flamarkt\Categories;

use Carbon\Carbon;
use Flamarkt\Categories\Event\Hidden;
use Flamarkt\Categories\Event\Restored;
use Flamarkt\Core\Product\Product;
use Flarum\Database\AbstractModel;
use Flarum\Database\ScopeVisibilityTrait;
use Flarum\Foundation\EventGeneratorTrait;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Relations;

/**
 * @property int $id
 * @property int $parent_id
 * @property string $slug
 * @property string $title
 * @property string $description
 * @property int $product_count
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property Carbon $hidden_at
 *
 * @property Product[]|Collection $products
 */
class Category extends AbstractModel
{
    use EventGeneratorTrait, ScopeVisibilityTrait;

    protected $table = 'flamarkt_categories';

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'hidden_at' => 'datetime',
    ];

    public function parent(): Relations\BelongsTo
    {
        return $this->belongsTo(self::class, 'parent_id');
    }

    public function children(): Relations\HasMany
    {
        return $this->hasMany(self::class, 'parent_id');
    }

    public function products(): Relations\BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'flamarkt_category_product');
    }

    public function hide(): self
    {
        if (!$this->hidden_at) {
            $this->hidden_at = Carbon::now();

            $this->raise(new Hidden($this));
        }

        return $this;
    }

    public function restore(): self
    {
        if ($this->hidden_at !== null) {
            $this->hidden_at = null;

            $this->raise(new Restored($this));
        }

        return $this;
    }
}
