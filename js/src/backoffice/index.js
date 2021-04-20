import Category from '../common/models/Category';
import BackofficeNav from 'flamarkt/core/backoffice/components/BackofficeNav';
import ProductList from 'flamarkt/core/backoffice/components/ProductList';
import {extend} from 'flarum/common/extend';
import LinkButton from 'flarum/common/components/LinkButton';
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

    extend(BackofficeNav.prototype, 'items', function (items) {
        items.add('categories', LinkButton.component({
            href: app.route('categories.index'),
            icon: 'fas fa-tags',
        }, 'Categories'));
    });

    extend(ProductList.prototype, 'head', function (columns) {
        columns.add('categories', m('th', 'Categories'));
    });

    extend(ProductList.prototype, 'columns', function (columns) {
        columns.add('categories', m('td', 'test'));
    });
});
