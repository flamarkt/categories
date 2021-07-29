import {extend} from 'flarum/common/extend';
import BackofficeNav from 'flamarkt/core/backoffice/components/BackofficeNav';
import ActiveLinkButton from 'flamarkt/core/common/components/ActiveLinkButton';
import Model from 'flarum/common/Model';
import Category from '../common/models/Category';
import CategoryIndexPage from './pages/CategoryIndexPage';
import CategoryShowPage from './pages/CategoryShowPage';
import extendProductIndex from './extendProductIndex';
import extendProductShow from './extendProductShow';

app.initializers.add('flamarkt-categories', () => {
    app.store.models['flamarkt-categories'] = Category;
    app.store.models['flamarkt-products'].prototype.categories = Model.hasMany('categories');

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

    extendProductIndex();
    extendProductShow();
});
