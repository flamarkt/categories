import ProductIndexLayout, {ProductIndexLayoutAttrs} from 'flamarkt/core/forum/layouts/ProductIndexLayout';
import LinkButton from 'flarum/common/components/LinkButton';
import Category from '../../common/models/Category';

export interface CategoryShowLayoutAttrs extends ProductIndexLayoutAttrs {
    category: Category | null,
}

export default class CategoryShowLayout extends ProductIndexLayout<CategoryShowLayoutAttrs> {
    breadcrumbItems() {
        const items = super.breadcrumbItems();

        if (this.attrs.category) {
            //TODO: parent
            items.add('category', LinkButton.component({
                href: app.route.category(this.attrs.category),
            }, this.attrs.category.title()));
        }

        return items;
    }
}
