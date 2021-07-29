import {extend} from 'flarum/common/extend';
import LinkButton from 'flarum/common/components/LinkButton';
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
            id: category.id(),
        });
    };
});
