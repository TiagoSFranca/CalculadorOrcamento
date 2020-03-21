import Login from 'views/auth/login/Login';
import Register from 'views/auth/register/Register';
import Home from "views/home/Home";
import OrcamentoAdicionar from "views/orcamento/adicionar/OrcamentoAdicionar";
import OrcamentoEditar from "views/orcamento/editar/OrcamentoEditar";
import OrcamentoItemAplicacao from "views/orcamento/editar/orcamentoItemAplicacao/OrcamentoItemAplicacao";
import OrcamentoUsuario from "views/orcamento/editar/orcamentoUsuario/OrcamentoUsuario";
import OrcamentoValor from "views/orcamento/editar/orcamentoValor/OrcamentoValor";
import OrcamentoIndex from "views/orcamento/index/OrcamentoIndex";

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
    {
        path: '/orcamento/editar/:id/usuarios',
        component: OrcamentoUsuario,
        isPrivate: true,
        exact: true
    },
]