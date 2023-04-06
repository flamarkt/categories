import Category from '../models/Category';

/**
 * Sort a list of categories according to the built-in rules:
 * Priority, then alphabetical order
 * This method is only intended to filter one level of categories at a time
 * @param categories
 */
export default function sortCategories(categories: Category[]) {
    return categories.slice(0).sort((a, b) => {
        const aPriority = a.priority();
        const bPriority = b.priority();

        if (aPriority > bPriority) {
            return -1;
        }

        if (bPriority > aPriority) {
            return 1;
        }

        return a.title() > b.title() ? 1 : -1;
    });
}
