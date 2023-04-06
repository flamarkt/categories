import {Vnode} from 'mithril';
import app from 'flamarkt/backoffice/backoffice/app';
import Page from 'flarum/common/components/Page';
import LinkButton from 'flarum/common/components/LinkButton';
import CategoryListState from '../states/CategoryListState';
import CategoryList from '../components/CategoryList';

export default class CategoryIndexPage extends Page {
    list!: CategoryListState;

    oninit(vnode: Vnode) {
        super.oninit(vnode);

        this.list = new CategoryListState();
        this.list.refresh();
    }

    view() {
        return m('.ProductIndexPage', m('.container', [
            m('.Form-group', [
                LinkButton.component({
                    className: 'Button',
                    href: app.route('categories.show', {
                        id: 'new',
                    }),
                }, 'New category' /* TODO */),
            ]),
            m(CategoryList, {
                list: this.list,
            }),
        ]));
    }
}
