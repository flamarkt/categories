import AbstractListState from 'flamarkt/backoffice/common/states/AbstractListState';
import Category from '../../common/models/Category';

export default class CategoryListState extends AbstractListState<Category> {
    type() {
        return 'flamarkt/categories';
    }
}
