import {Vnode} from 'mithril';
import app from 'flarum/forum/app';
import Page from 'flarum/common/components/Page';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import extractText from 'flarum/common/utils/extractText';
import CategoryIndexLayout from '../layouts/CategoryIndexLayout';

export default class CategoryIndexPage extends Page {
    loading: boolean = false;

    oninit(vnode: Vnode) {
        super.oninit(vnode);

        app.setTitle(extractText(app.translator.trans('flamarkt-categories.forum.categories.browserTitle')));
        app.setTitleCount(0);

        this.loading = true;
        app.store.find('flamarkt/categories').then(() => {
            this.loading = false;
            m.redraw();
        });
    }

    view() {
        return this.loading ? LoadingIndicator.component() : CategoryIndexLayout.component();
    }
}
