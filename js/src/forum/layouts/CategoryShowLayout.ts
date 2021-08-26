import ProductIndexLayout, {ProductIndexLayoutAttrs} from 'flamarkt/core/forum/layouts/ProductIndexLayout';
import LinkButton from 'flarum/common/components/LinkButton';
import Category from '../../common/models/Category';

export interface CategoryShowLayoutAttrs extends ProductIndexLayoutAttrs {
    category: Category | null,
}

export default class CategoryShowLayout extends ProductIndexLayout<CategoryShowLayoutAttrs> {
    attrs!: CategoryShowLayoutAttrs

    breadcrumbItems() {
        const items = super.breadcrumbItems();

        items.add('categories', LinkButton.component({
            href: app.route('flamarkt.categories.index'),
        }, app.translator.trans('flamarkt-categories.forum.breadcrumb.categories')));

        //TODO: parent category

        return items;
    }

    title() {
        if (!this.attrs.category) {
            return app.translator.trans('flamarkt-categories.forum.category.titleWhileLoading');
        }

        return this.attrs.category.title();
    }

    currentPageHref() {
        // We need to override this method because ProductIndexLayout uses it to signal whether it's the homepage
        return null;
    }
}
