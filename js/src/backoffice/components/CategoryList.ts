import AbstractList from 'flamarkt/core/backoffice/components/AbstractList';
import Link from 'flarum/common/components/Link';
import LinkButton from 'flarum/common/components/LinkButton';
import Category from '../../common/models/Category';

export default class CategoryList extends AbstractList {
    head() {
        const columns = super.head();

        columns.add('parent', m('th', 'Parent'));
        columns.add('title', m('th', 'Title'));//TODO
        columns.add('productCount', m('th', 'Products'));

        return columns;
    }

    columns(category: Category) {
        const columns = super.columns(category);

        const parent = category.parent();

        columns.add('parent', m('td', parent ? m(Link, {
            href: app.route('categories.show', {
                id: parent.id(),
            }),
        }, parent.title()) : m('em', 'Root')));
        columns.add('title', m('td', category.title()));
        columns.add('productCount', m('td', category.productCount()));

        return columns;
    }

    actions(category: Category) {
        const actions = super.actions(category);

        actions.add('edit', LinkButton.component({
            className: 'Button Button--icon',
            icon: 'fas fa-pen',
            href: app.route('categories.show', {
                id: category.id(),
            }),
        }));

        return actions;
    }
}
