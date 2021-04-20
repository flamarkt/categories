import Model from 'flarum/common/Model';

export default class Category extends Model {
    title = Model.attribute('title');
    description = Model.attribute('description');

    apiEndpoint() {
        return '/flamarkt/categories' + (this.exists ? '/' + this.data.id : '');
    }
}
