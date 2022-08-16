import {Vnode} from 'mithril';
import app from 'flarum/forum/app';
import AbstractShowPage from 'flamarkt/backoffice/common/pages/AbstractShowPage';
import ProductListState from 'flamarkt/core/common/states/ProductListState';
import CategoryShowLayout from '../layouts/CategoryShowLayout';
import Category from '../../common/models/Category';

export default class CategoryShowPage extends AbstractShowPage {
    category: Category | null = null;
    listState!: ProductListState;

    oninit(vnode: Vnode) {
        super.oninit(vnode);

        this.listState = this.initState();
    }

    initState() {
        const params = m.route.param();

        return new ProductListState({
            sort: params.sort,
        });
    }

    findType() {
        return 'flamarkt/categories';
    }

    requestParams(): any {
        const params = super.requestParams();

        params.bySlug = true;

        return params;
    }

    show(category: Category) {
        this.category = category;

        app.setTitle(category.title());
        app.setTitleCount(0);

        this.listState.params.filter = {
            category: category.slug(),
        };
        this.listState.refresh();
    }

    view() {
        return CategoryShowLayout.component({
            category: this.category,
            state: this.listState,
        });
    }
}
