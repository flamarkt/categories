import ProductShowPage from 'flamarkt/core/backoffice/pages/ProductShowPage';
import Category from './src/common/models/Category';

declare module 'flamarkt/core/backoffice/pages/ProductShowPage' {
    export default interface ProductShowPage {
        categories: Category[]
    }
}
