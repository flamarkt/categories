import AbstractRelationshipSelect from 'flamarkt/backoffice/common/components/AbstractRelationshipSelect';
import highlight from 'flarum/common/helpers/highlight';
import Category from '../../common/models/Category';

export default class CategoryRelationshipSelect extends AbstractRelationshipSelect<Category> {
    protected resultsCache = new Map<string, Category[]>();

    search(query: string) {
        if (!query) {
            m.redraw();
            return Promise.resolve();
        }

        query = query.toLowerCase();

        return app.store
            .find('flamarkt/categories', {
                filter: {q: query},
                page: {limit: 5},
            })
            .then((results) => {
                this.resultsCache.set(query, results);
                m.redraw();
            });
    }

    results(query: string) {
        if (!query) {
            return [];
        }

        query = query.toLowerCase();

        const results = this.resultsCache.get(query);

        // Indicates still loading
        if (typeof results === 'undefined') {
            return null;
        }

        return results || [];
    }

    item(category: Category, query?: string) {
        return [
            query ? highlight(category.title(), query) : category.title(),
        ];
    }
}
