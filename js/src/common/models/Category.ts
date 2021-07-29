import Model from 'flarum/common/Model';

export default class Category extends Model {
    slug = Model.attribute('slug');
    title = Model.attribute('title');
    description = Model.attribute('description');
    productCount = Model.attribute('productCount');
    isHidden = Model.attribute('isHidden');

    parent = Model.hasOne('parent');

    apiEndpoint() {
        return '/flamarkt/categories' + (this.exists ? '/' + this.data.id : '');
    }
}
