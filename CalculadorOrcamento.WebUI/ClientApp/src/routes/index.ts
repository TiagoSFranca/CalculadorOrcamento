import Home from "views/home/Home";
import Counter from "components/Counter";
import FetchData from "components/FetchData";
import OrcamentoIndex from "views/orcamento/index/OrcamentoIndex";
import OrcamentoAdicionar from "views/orcamento/adicionar/OrcamentoAdicionar"
import OrcamentoEditar from "views/orcamento/editar/OrcamentoEditar"
import OrcamentoItemAplicacao from "views/orcamento/editar/orcamentoItemAplicacao/OrcamentoItemAplicacao"
import OrcamentoValor from "views/orcamento/editar/orcamentoValor/OrcamentoValor"
import Login from 'views/auth/login/Login'
import Register from 'views/auth/register/Register'

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
    },
    {
        path: '/orcamento/editar/:id/dados',
        component: OrcamentoEditar,
        isPrivate: true,
        exact: true
    },
    {
        path: '/orcamento/editar/:id/itens-aplicacao',
        component: OrcamentoItemAplicacao,
        isPrivate: true,
        exact: true
    },
    {
        exact: true,
        path: '/login',
        component: Login,
        isPrivate: false
    },
    {
        exact: true,
        path: '/register',
        component: Register,
        isPrivate: false
    },
    {
        path: '/orcamento/editar/:id/valores',
        component: OrcamentoValor,
        isPrivate: true,
        exact: true
    },
]