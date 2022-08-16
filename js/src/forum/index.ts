import app from 'flarum/forum/app';
import {extend} from 'flarum/common/extend';
import LinkButton from 'flarum/common/components/LinkButton';
import Separator from 'flarum/common/components/Separator';
import IndexPage from 'flarum/forum/components/IndexPage';
import Category from '../common/models/Category';
import CategoryIndexPage from './pages/CategoryIndexPage';
import CategoryShowPage from './pages/CategoryShowPage';

app.initializers.add('flamarkt-categories', () => {
    app.store.models['flamarkt-categories'] = Category;

    app.routes['flamarkt.categories.index'] = {
        path: '/categories',
        component: CategoryIndexPage,
    };
    app.routes['flamarkt.categories.show'] = {
        path: '/categories/:id',
        component: CategoryShowPage,
    };

    app.route.category = category => {
        return app.route('flamarkt.categories.show', {
            id: category.slug(),
        });
    };

    extend(IndexPage.prototype, 'navItems', function (items) {
        items.add('flamarkt-categories', LinkButton.component({
            icon: 'fas fa-th-large',
            href: app.route('flamarkt.categories.index'),
        }, app.translator.trans('flamarkt-categories.forum.nav.allCategories')), -10);

        if (app.current.matches(CategoryIndexPage)) return;

        items.add('separator', Separator.component(), -12);

        const categories = app.store.all<Category>('flamarkt-categories');

        categories.forEach(category => {
            items.add('flamarkt-category' + category.id(), LinkButton.component({
                icon: 'fas fa-tag',
                href: app.route.category(category),
            }, [
                category.title(),
                m('span.Button-badge', category.productCount()),
            ]), -14);
        });
    });
});
