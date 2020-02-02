import Home from "components/Home";
import Counter from "components/Counter";
import FetchData from "components/FetchData";
import OrcamentoIndex from "views/orcamento/index/OrcamentoIndex";
import OrcamentoAdicionar from "views/orcamento/adicionar/OrcamentoAdicionar"

export interface RouteItem {
    exact?: boolean | false,
    path: string,
    component: any,
    isPrivate: boolean
}

export const routes: RouteItem[] = [
    {
        exact: true,
        path: '/',
        component: Home,
        isPrivate: true
    },
    {
        path: '/counter',
        component: Counter,
        isPrivate: false
    },
    {
        path: '/fetch-data/:startDateIndex?',
        component: FetchData,
        isPrivate: true
    },
    {
        exact: true,
        path: '/orcamento',
        component: OrcamentoIndex,
        isPrivate: true
    },
    {
        path: '/orcamento/adicionar',
        component: OrcamentoAdicionar,
        isPrivate: true
    }
]