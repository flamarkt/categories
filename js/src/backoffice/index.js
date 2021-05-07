import Category from '../common/models/Category';
import BackofficeNav from 'flamarkt/core/backoffice/components/BackofficeNav';
import ProductList from 'flamarkt/core/backoffice/components/ProductList';
import ActiveLinkButton from 'flamarkt/core/common/components/ActiveLinkButton';
import {extend} from 'flarum/common/extend';
import CategoryIndexPage from './pages/CategoryIndexPage';
import CategoryShowPage from './pages/CategoryShowPage';

app.initializers.add('flamarkt-categories', () => {
    app.store.models['flamarkt-categories'] = Category;

    app.routes['categories.index'] = {
        path: '/categories',
        component: CategoryIndexPage,
    };
    app.routes['categories.show'] = {
        path: '/categories/:id',
        component: CategoryShowPage,
    };

    app.route.category = category => {
        return app.route('categories.show', {
            id: category.id(),
        });
    };

    extend(BackofficeNav.prototype, 'items', function (items) {
        items.add('categories', ActiveLinkButton.component({
            href: app.route('categories.index'),
            icon: 'fas fa-th-list',
            activeRoutes: [
                'categories.*',
            ],
        }, app.translator.trans('flamarkt-categories.backoffice.nav.categories')));
    });

    extend(ProductList.prototype, 'head', function (columns) {
        columns.add('categories', m('th', app.translator.trans('flamarkt-categories.backoffice.products.head.category')), 20);
    });

    extend(ProductList.prototype, 'columns', function (columns) {
        columns.add('categories', m('td', 'test'), 20);
    });
});
