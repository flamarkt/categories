import app from 'flarum/forum/app';
import ItemList from 'flarum/common/utils/ItemList';
import LinkButton from 'flarum/common/components/LinkButton';
import Category from '../../common/models/Category';

export default function (items: ItemList<any>, category: Category | null | undefined, onlyParents: boolean = false) {
    if (app.forum.attribute('flamarktCategoriesIndexInBreadcrumb')) {
        items.add('categories', LinkButton.component({
            href: app.route('flamarkt.categories.index'),
        }, app.translator.trans('flamarkt-categories.forum.breadcrumb.categories')));
    }

    // Allow passing no category as it's easier on pages where the data is loaded asynchronously
    // It's also more resilient to errors if extensions call it with invalid data
    if (!category) {
        return;
    }

    const categoriesShown = [];
    let loopCategory: Category = category;

    while (true) {
        // Skip first category if onlyParents is set
        // Useful when showing breadcrumb to category itself
        if (loopCategory !== category || !onlyParents) {
            items.add('category-' + loopCategory.id(), LinkButton.component({
                href: app.route.category(loopCategory),
            }, loopCategory.title()));
        }

        const nextCategory = category.parent();

        // Exit when no more parent and prevent loops inside category tree
        if (!nextCategory || categoriesShown.indexOf(nextCategory) !== -1) {
            break;
        }

        loopCategory = nextCategory;
        categoriesShown.push(nextCategory);
    }
}
