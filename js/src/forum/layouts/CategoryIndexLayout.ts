import AbstractShopLayout from 'flamarkt/core/forum/layouts/AbstractShopLayout';
import Link from 'flarum/common/components/Link';

export default class CategoryIndexLayout extends AbstractShopLayout {
    title() {
        return app.translator.trans('flamarkt-categories.forum.categories.headingTitle');
    }

    content() {
        const categories = app.store.all('flamarkt-categories');

        return m('ul', categories.map(category => m('li', Link.component({
            href: app.route.category(category),
        }, category.title()))));
    }
}
