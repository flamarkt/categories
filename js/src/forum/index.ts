import app from 'flarum/forum/app';
import Extend from 'flarum/common/extenders';
import {extend} from 'flarum/common/extend';
import LinkButton from 'flarum/common/components/LinkButton';
import Separator from 'flarum/common/components/Separator';
import IndexPage from 'flarum/forum/components/IndexPage';
import Product from 'flamarkt/core/common/models/Product';
import ProductShowLayout from 'flamarkt/core/forum/layouts/ProductShowLayout';
import {common} from '../common/compat';
import {forum} from './compat';
import Category from '../common/models/Category';
import sortCategories from '../common/utils/sortCategories';
import CategoryIndexPage from './pages/CategoryIndexPage';
import CategoryShowPage from './pages/CategoryShowPage';
import buildBreadcrumb from './utils/buildBreadcrumb';

const extenders = [
    new Extend.Store()
        .add('flamarkt-categories', Category),
    new Extend.Model(Product)
        .hasMany('categories'),
    new Extend.Routes()
        .add('flamarkt.categories.index', '/categories', CategoryIndexPage)
        .add('flamarkt.categories.show', '/categories/:id', CategoryShowPage),
];

export {
    extenders as extend,
    common,
    forum,
};

app.initializers.add('flamarkt-categories', () => {
    app.route.category = category => {
        return app.route('flamarkt.categories.show', {
            id: category.slug(),
        });
    };

    extend(IndexPage.prototype, 'navItems', function (items) {
        if (app.forum.attribute('flamarktCategoriesIndexInSideNav')) {
            items.add('flamarkt-categories', LinkButton.component({
                icon: 'fas fa-th-large',
                href: app.route('flamarkt.categories.index'),
            }, app.translator.trans('flamarkt-categories.forum.nav.allCategories')), -10);
        }

        if (!app.forum.attribute('flamarktCategoriesListInSideNav')) {
            return;
        }

        if (app.current.matches(CategoryIndexPage)) return;

        items.add('separator', Separator.component(), -12);

        const allCategories = app.store.all<Category>('flamarkt-categories');
        const rootCategories = sortCategories(allCategories.filter(c => c.isRoot()));

        // TODO: set active if current product page contains category
        const activeCategorySlug = app.current.get('routeName') === 'flamarkt.categories.show' && m.route.param('id');
        const activeCategory: Category | undefined = activeCategorySlug ? allCategories.find(c => c.slug() === activeCategorySlug) : undefined;

        rootCategories.forEach(category => {
            const childCategories = allCategories.filter(c => c.parent() === category);
            const active = category === activeCategory || (activeCategory && childCategories.indexOf(activeCategory) !== -1);

            items.add('flamarkt-category' + category.id(), LinkButton.component({
                className: 'FlamarktCategoryLinkButton',
                icon: 'fas fa-tag',
                href: app.route.category(category),
                active,
            }, [
                category.title(),
                m('span.Button-badge', category.productCount()),
            ]), -14);

            if (active && childCategories.length) {
                sortCategories(childCategories).forEach(childCategory => {
                    items.add('flamarkt-category' + childCategory.id(), LinkButton.component({
                        className: 'FlamarktCategoryLinkButton child',
                        icon: 'fas fa-tag',
                        href: app.route.category(childCategory),
                    }, [
                        childCategory.title(),
                        m('span.Button-badge', childCategory.productCount()),
                    ]), -14);
                });
            }
        });
    });

    extend(ProductShowLayout.prototype, 'breadcrumbItems', function (items) {
        const categories = this.product()?.categories() || [];

        if (!categories.length) {
            return;
        }

        // Use the most important category if there are multiple ones
        buildBreadcrumb(items, sortCategories(categories)[0]);
    });
});
