import AbstractListState from 'flamarkt/core/common/states/AbstractListState';

export default class CategoryListState extends AbstractListState {
    type() {
        return 'flamarkt/categories';
    }
}
