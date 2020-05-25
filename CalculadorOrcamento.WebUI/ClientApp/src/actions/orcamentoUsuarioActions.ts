import HTTP from "http/index";
import axios from 'axios';
import { AppThunkAction } from 'store/index';
import { AdicionarOrcamentoUsuario, EditarOrcamentoUsuario, OrcamentoUsuario } from "store/orcamentoUsuario/models";
import KnownAction from 'store/reduceTypesIndex';
import { dispatchSnackBar, sucessoPadrao } from 'utils/snackBar';
import { Usuario } from "store/auth/models";

const BASE_URL = "orcamentoUsuarios";

const CancelToken = axios.CancelToken;

let cancel: any;

const requestOrcamentoUsuarios = (callback: Function, idOrcamento: number): AppThunkAction<KnownAction> => (dispatch) => {
    dispatch({ type: 'IS_LOADING_APP', value: true });

    HTTP.get(`/${BASE_URL}?idOrcamento=${idOrcamento}`)
        .then(response => response.data as Promise<OrcamentoUsuario[]>)
        .then(result => {
            dispatch({ type: 'RECEIVE_ORCAMENTO_USUARIOS', orcamentoUsuarios: result });
            dispatch({ type: 'IS_LOADING_APP', value: false });

            callback();
        }, error => {
            callback(error);
            dispatch({ type: 'IS_LOADING_APP', value: false });
        });
};

const adicionarOrcamentoUsuario = (data: AdicionarOrcamentoUsuario, callback: (sucesso: boolean) => void, loadingIdentifier: string): AppThunkAction<KnownAction> => (dispatch) => {
    dispatch({ type: 'IS_LOADING_APP', value: true });
    dispatch({ type: 'SET_LOADING_COMPONENT', item: { name: loadingIdentifier, loading: true } });

    HTTP.post(`/${BASE_URL}`, JSON.stringify(data))
        .then(response => response.data as Promise<OrcamentoUsuario>)
        .then(data => {
            dispatch({ type: 'ADICIONAR_ORCAMENTO_USUARIO', orcamentoUsuario: data });
            dispatch({ type: 'IS_LOADING_APP', value: false });
            dispatch({ type: 'SET_LOADING_COMPONENT', item: { name: loadingIdentifier, loading: false } });
            dispatch(sucessoPadrao());

            callback(true);
        }, error => {
            dispatch(dispatchSnackBar(null, error));
            dispatch({ type: 'IS_LOADING_APP', value: false });
            dispatch({ type: 'SET_LOADING_COMPONENT', item: { name: loadingIdentifier, loading: false } });

            callback(false);
        });
};

const editarOrcamentoUsuario = (id: number, data: EditarOrcamentoUsuario, callback: (sucesso: boolean) => void, loadingIdentifier: string): AppThunkAction<KnownAction> => (dispatch) => {
    dispatch({ type: 'IS_LOADING_APP', value: true });
    dispatch({ type: 'SET_LOADING_COMPONENT', item: { name: loadingIdentifier, loading: true } });

    HTTP.put(`/${BASE_URL}/${id}`, JSON.stringify(data))
        .then(response => response.data as Promise<OrcamentoUsuario>)
        .then(data => {
            dispatch({ type: 'IS_LOADING_APP', value: false });
            dispatch({ type: 'SET_LOADING_COMPONENT', item: { name: loadingIdentifier, loading: false } });
            dispatch({ type: 'SET_SEARCH_ORCAMENTO_USUARIO', value: true });
            dispatch(sucessoPadrao());

            callback(true);
        }, error => {
            dispatch(dispatchSnackBar(null, error));
            dispatch({ type: 'IS_LOADING_APP', value: false });
            dispatch({ type: 'SET_LOADING_COMPONENT', item: { name: loadingIdentifier, loading: false } });

            callback(false);
        });
};

const excluirOrcamentoUsuario = (id: number, callback: (sucesso: boolean) => void, loadingIdentifier: string): AppThunkAction<KnownAction> => (dispatch) => {
    dispatch({ type: 'IS_LOADING_APP', value: true });
    dispatch({ type: 'SET_LOADING_COMPONENT', item: { name: loadingIdentifier, loading: true } });

    HTTP.delete(`/${BASE_URL}/${id}`)
        .then(response => response.data as Promise<OrcamentoUsuario>)
        .then(data => {
            dispatch({ type: 'SET_SEARCH_ORCAMENTO_USUARIO', value: true });
            dispatch({ type: 'IS_LOADING_APP', value: false });
            dispatch({ type: 'SET_LOADING_COMPONENT', item: { name: loadingIdentifier, loading: false } });
            dispatch(sucessoPadrao());

            callback(true);
        }, error => {
            dispatch(dispatchSnackBar(null, error));
            dispatch({ type: 'IS_LOADING_APP', value: false });
            dispatch({ type: 'SET_LOADING_COMPONENT', item: { name: loadingIdentifier, loading: false } });

            callback(false);
        });
};

const requestUsuarios = (id: number, termo: string, loadingIdentifier: string): AppThunkAction<KnownAction> => (dispatch) => {

    if (cancel) {
        cancel();
    }

    dispatch({ type: 'IS_LOADING_APP', value: true });
    dispatch({ type: 'SET_LOADING_COMPONENT', item: { name: loadingIdentifier, loading: true } });

    HTTP.get(`/${BASE_URL}/BuscarUsuarios?idOrcamento=${id}&termo=${termo}`, {
        cancelToken: new CancelToken((c) => { cancel = c; })
    })
        .then(response => response.data as Promise<Usuario[]>)
        .then(data => {
            dispatch({ type: 'RECEIVE_USUARIOS_ORCAMENTO_USUARIO', usuarios: data });
            dispatch({ type: 'IS_LOADING_APP', value: false });
            dispatch({ type: 'SET_LOADING_COMPONENT', item: { name: loadingIdentifier, loading: false } });
        }, error => {
            dispatch({ type: 'IS_LOADING_APP', value: false });
            dispatch({ type: 'SET_LOADING_COMPONENT', item: { name: loadingIdentifier, loading: false } });
        });
};

export default {
    requestOrcamentoUsuarios,
    adicionarOrcamentoUsuario,
    editarOrcamentoUsuario,
    excluirOrcamentoUsuario,
    requestUsuarios,
}