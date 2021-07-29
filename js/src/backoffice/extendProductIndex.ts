import {extend} from 'flarum/common/extend';
import ProductList from 'flamarkt/core/backoffice/components/ProductList';
import ItemList from 'flarum/common/utils/ItemList';

export default function () {
    extend(ProductList.prototype, 'head', function (columns: ItemList) {
        columns.add('categories', m('th', app.translator.trans('flamarkt-categories.backoffice.products.head.category')), 20);
    });

    extend(ProductList.prototype, 'columns', function (columns: ItemList, product) {
        columns.add('categories', m('td', (product.categories() || []).map(category => category.title()).join(', ')), 20);
    });
}
