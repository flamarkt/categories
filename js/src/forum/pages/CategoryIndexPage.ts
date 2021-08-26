import {Vnode} from 'mithril';
import Page from 'flarum/common/components/Page';
import CategoryIndexLayout from '../layouts/CategoryIndexLayout';

export default class CategoryIndexPage extends Page {
    oninit(vnode: Vnode) {
        super.oninit(vnode);

        app.setTitle(app.translator.trans('flamarkt-categories.forum.categories.browserTitle'));
        app.setTitleCount(0);
    }

    view() {
        return CategoryIndexLayout.component();
    }
}
