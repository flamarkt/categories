import {Children} from 'mithril';
import app from 'flarum/forum/app';
import AbstractShopLayout from 'flamarkt/core/forum/layouts/AbstractShopLayout';
import Link from 'flarum/common/components/Link';
import Category from '../../common/models/Category';
import sortCategories from '../../common/utils/sortCategories';

export default class CategoryIndexLayout extends AbstractShopLayout {
    title() {
        return app.translator.trans('flamarkt-categories.forum.categories.headingTitle');
    }

    content() {
        const allCategories = app.store.all<Category>('flamarkt-categories');
        const rootCategories = sortCategories(allCategories.filter(c => c.isRoot()));

        return m('ul', sortCategories(rootCategories).map(category => {
            const childCategories = allCategories.filter(c => c.parent() === category);

            return this.link(category, childCategories.length > 0 ? m('ul', sortCategories(childCategories).map(category => {
                return this.link(category);
            })) : null);
        }));
    }

    link(category: Category, children: Children = null): Children {
        return m('li', [
            Link.component({
                href: app.route.category(category),
            }, category.title()),
            children,
        ]);
    }
}
