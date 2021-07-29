import {Vnode} from 'mithril';
import AbstractShowPage from 'flamarkt/core/common/pages/AbstractShowPage';
import ProductListState from 'flamarkt/core/common/states/ProductListState';
import CategoryShowLayout from '../layouts/CategoryShowLayout';
import Category from '../../common/models/Category';

export default class CategoryShowPage extends AbstractShowPage {
    category: Category | null = null;
    state!: ProductListState;

    oninit(vnode: Vnode) {
        super.oninit(vnode);

        this.state = this.initState();
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

    show(category: Category) {
        this.category = category;

        app.setTitle(category.title());
        app.setTitleCount(0);

        this.state.params.filter = {
            category: category.id(), // TODO: slug?
        };
        this.state.refresh();
    }

    view() {
        return CategoryShowLayout.component({
            category: this.category,
            state: this.state,
        });
    }
}
