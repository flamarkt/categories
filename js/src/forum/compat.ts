import CategoryIndexLayout from './layouts/CategoryIndexLayout';
import CategoryShowLayout from './layouts/CategoryShowLayout';
import CategoryIndexPage from './pages/CategoryIndexPage';
import CategoryShowPage from './pages/CategoryShowPage';
import buildBreadcrumb from './utils/buildBreadcrumb';

export const forum = {
    'layouts/CategoryIndexLayout': CategoryIndexLayout,
    'layouts/CategoryShowLayout': CategoryShowLayout,
    'pages/CategoryIndexPage': CategoryIndexPage,
    'pages/CategoryShowPage': CategoryShowPage,
    'utils/buildBreadcrumb': buildBreadcrumb,
}
