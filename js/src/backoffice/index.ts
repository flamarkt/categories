import app from 'flamarkt/backoffice/backoffice/app';
import {extend} from 'flarum/common/extend';
import BackofficeNav from 'flamarkt/backoffice/backoffice/components/BackofficeNav';
import ActiveLinkButton from 'flamarkt/backoffice/common/components/ActiveLinkButton';
import Model from 'flarum/common/Model';
import {common} from '../common/compat';
import {backoffice} from './compat';
import Category from '../common/models/Category';
import CategoryIndexPage from './pages/CategoryIndexPage';
import CategoryShowPage from './pages/CategoryShowPage';
import extendProductIndex from './extendProductIndex';
import extendProductShow from './extendProductShow';

export {
    common,
    backoffice,
};

app.initializers.add('flamarkt-categories', () => {
    app.extensionData.for('flamarkt-categories')
        .registerSetting({
            setting: 'flamarkt-categories.listInSideNav',
            type: 'switch',
            label: app.translator.trans('flamarkt-categories.backoffice.settings.listInSideNav'),
        })
        .registerSetting({
            setting: 'flamarkt-categories.indexInSideNav',
            type: 'switch',
            label: app.translator.trans('flamarkt-categories.backoffice.settings.indexInSideNav'),
        })
        .registerSetting({
            setting: 'flamarkt-categories.indexInBreadcrumb',
            type: 'switch',
            label: app.translator.trans('flamarkt-categories.backoffice.settings.indexInBreadcrumb'),
        });

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
