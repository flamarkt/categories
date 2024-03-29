import Model from 'flarum/common/Model';

export default class Category extends Model {
    slug = Model.attribute<string>('slug');
    title = Model.attribute<string>('title');
    description = Model.attribute<string>('description');
    priority = Model.attribute<number>('priority');
    productCount = Model.attribute<number>('productCount');
    isRoot = Model.attribute<boolean>('isRoot');
    isHidden = Model.attribute<boolean>('isHidden');

    parent = Model.hasOne<Category>('parent');

    apiEndpoint() {
        return '/flamarkt/categories' + (this.exists ? '/' + (this.data as any).id : '');
    }
}
