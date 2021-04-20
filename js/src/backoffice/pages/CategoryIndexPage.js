import Page from 'flarum/common/components/Page';
import LinkButton from 'flarum/common/components/LinkButton';
import CategoryListState from '../states/CategoryListState';
import CategoryList from '../components/CategoryList';

/* global m */

export default class CategoryIndexPage extends Page {
    oninit() {
        this.state = new CategoryListState();
        this.state.refresh();
    }

    view() {
        return m('.ProductIndexPage', [
            m('.Form-group', [
                LinkButton.component({
                    className: 'Button',
                    href: app.route('categories.show', {
                        id: 'new',
                    }),
                }, 'New category' /* TODO */),
            ]),
            m(CategoryList, {
                state: this.state,
            }),
        ]);
    }
}
