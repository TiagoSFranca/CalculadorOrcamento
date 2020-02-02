import Home from "components/Home";
import Counter from "components/Counter";
import FetchData from "components/FetchData";
import OrcamentoIndex from "views/orcamento/index/OrcamentoIndex";

export interface RouteItem {
    exact?: boolean | false,
    path: string,
    component: any
}

export const routes: RouteItem[] = [
    {
        exact: true,
        path: '/',
        component: Home
    },
    {
        path: '/counter',
        component: Counter
    },
    {
        path: '/fetch-data/:startDateIndex?',
        component: FetchData
    },
    {
        path: '/orcamento',
        component: OrcamentoIndex
    }
]