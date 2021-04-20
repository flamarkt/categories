import {extend} from 'flarum/common/extend';
import LinkButton from 'flarum/common/components/LinkButton';
import Category from '../common/models/Category';

app.initializers.add('flamarkt-categories', () => {
    app.store.models['flamarkt-categories'] = Category;

});
