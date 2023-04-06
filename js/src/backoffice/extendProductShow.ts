import {extend} from 'flarum/common/extend';
import ProductShowPage from 'flamarkt/core/backoffice/pages/ProductShowPage';
import CategoryRelationshipSelect from './components/CategoryRelationshipSelect';

export default function () {
    extend(ProductShowPage.prototype, 'oninit', function (this: ProductShowPage) {
        this.categories = [];
    });

    extend(ProductShowPage.prototype, 'show', function (this: ProductShowPage, returnValue: any, product) {
        this.categories = product.categories() || [];
    });

    extend(ProductShowPage.prototype, 'fields', function (this: ProductShowPage, fields) {
        fields.add('categories', m('.Form-group', [
            m('label', 'Categories'),
            m(CategoryRelationshipSelect, {
                relationship: this.categories,
                onchange: categories => {
                    this.categories = categories;
                    this.dirty = true;
                },
            }),
        ]), 100);
    });

    extend(ProductShowPage.prototype, 'data', function (this: ProductShowPage, data: any) {
        data.relationships = data.relationships || {};
        data.relationships.categories = this.categories;
    });
}
