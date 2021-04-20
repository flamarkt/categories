import AbstractList from 'flamarkt/core/backoffice/components/AbstractList';
import LinkButton from 'flarum/common/components/LinkButton';
import Button from 'flarum/common/components/Button';

export default class CategoryList extends AbstractList {
    head() {
        const columns = super.head();

        columns.add('title', m('th', 'Title'));//TODO

        return columns;
    }

    columns(category) {
        const columns = super.columns(category);

        columns.add('title', m('td', category.title()));

        return columns;
    }

    actions(category) {
        const actions = super.actions(category);

        actions.add('edit', LinkButton.component({
            className: 'Button Button--icon',
            icon: 'fas fa-pen',
            href: app.route('categories.show', {
                id: category.id(),
            }),
        }));

        actions.add('hide', Button.component({
            className: 'Button Button--icon',
            icon: 'fas fa-times',
        }));

        return actions;
    }
}
