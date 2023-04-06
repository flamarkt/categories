import app from 'flarum/forum/app';
import ProductIndexLayout, {ProductIndexLayoutAttrs} from 'flamarkt/core/forum/layouts/ProductIndexLayout';
import Category from '../../common/models/Category';
import buildBreadcrumb from '../utils/buildBreadcrumb';

export interface CategoryShowLayoutAttrs extends ProductIndexLayoutAttrs {
    category: Category | null,
}

export default class CategoryShowLayout extends ProductIndexLayout<CategoryShowLayoutAttrs> {
    attrs!: CategoryShowLayoutAttrs

    breadcrumbItems() {
        const items = super.breadcrumbItems();

        buildBreadcrumb(items, this.attrs.category, true);

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
        return '';
    }
}
