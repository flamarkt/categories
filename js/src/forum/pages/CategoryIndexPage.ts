import {Vnode} from 'mithril';
import app from 'flarum/forum/app';
import Page from 'flarum/common/components/Page';
import extractText from 'flarum/common/utils/extractText';
import CategoryIndexLayout from '../layouts/CategoryIndexLayout';

export default class CategoryIndexPage extends Page {
    oninit(vnode: Vnode) {
        super.oninit(vnode);

        app.setTitle(extractText(app.translator.trans('flamarkt-categories.forum.categories.browserTitle')));
        app.setTitleCount(0);
    }

    view() {
        return CategoryIndexLayout.component();
    }
}
