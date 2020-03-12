import { AdicionarOrcamentoUsuario, EditarOrcamentoUsuario, OrcamentoUsuario } from "store/orcamentoUsuario/models";
import { AppThunkAction } from 'store/index';
import KnownAction from 'store/reduceTypesIndex';
import HTTP from "http/index";

const BASE_URL = "orcamentoUsuarios";

const requestOrcamentos = (callback: Function, idOrcamento: number): AppThunkAction<KnownAction> => (dispatch) => {
    dispatch({ type: 'IS_LOADING_ORCAMENTO_USUARIO', value: true });

    HTTP.get(`/${BASE_URL}?idOrcamento=${idOrcamento}`)
        .then(response => response.data as Promise<OrcamentoUsuario[]>)
        .then(result => {
            dispatch({ type: 'RECEIVE_ORCAMENTO_USUARIOS', orcamentoUsuarios: result });
            dispatch({ type: 'IS_LOADING_ORCAMENTO_USUARIO', value: false });

            callback();
        }, error => {
            callback(error);
            dispatch({ type: 'IS_LOADING_ORCAMENTO_USUARIO', value: false });
        });
};

const adicionarUsuario = (data: AdicionarOrcamentoUsuario, callback: Function): AppThunkAction<KnownAction> => (dispatch) => {
    dispatch({ type: 'IS_LOADING_ORCAMENTO_USUARIO', value: true });

    HTTP.post(`/${BASE_URL}`, JSON.stringify(data))
        .then(response => response.data as Promise<OrcamentoUsuario>)
        .then(data => {
            dispatch({ type: 'ADICIONAR_ORCAMENTO_USUARIO', orcamentoUsuario: data });
            dispatch({ type: 'IS_LOADING_ORCAMENTO_USUARIO', value: false });
            callback();
        }, error => {
            callback(error);
            dispatch({ type: 'IS_LOADING_ORCAMENTO_USUARIO', value: false });
        });
};

const editarUsuario = (id: number, data: EditarOrcamentoUsuario, callback: Function): AppThunkAction<KnownAction> => (dispatch) => {
    dispatch({ type: 'IS_LOADING_ORCAMENTO_USUARIO', value: true });

    HTTP.put(`/${BASE_URL}/${id}`, JSON.stringify(data))
        .then(response => response.data as Promise<OrcamentoUsuario>)
        .then(data => {
            dispatch({ type: 'ADICIONAR_ORCAMENTO_USUARIO', orcamentoUsuario: data });
            dispatch({ type: 'IS_LOADING_ORCAMENTO_USUARIO', value: false });
            callback();
        }, error => {
            callback(error);
            dispatch({ type: 'IS_LOADING_ORCAMENTO_USUARIO', value: false });
        });
};

const excluirUsuario = (id: number, callback: Function): AppThunkAction<KnownAction> => (dispatch) => {
    dispatch({ type: 'IS_LOADING_ORCAMENTO_USUARIO', value: true });

    HTTP.delete(`/${BASE_URL}/${id}`)
        .then(response => response.data as Promise<OrcamentoUsuario>)
        .then(data => {
            dispatch({ type: 'SET_SEARCH_ORCAMENTO_USUARIO', value: true });
            dispatch({ type: 'IS_LOADING_ORCAMENTO_USUARIO', value: false });
            callback();
        }, error => {
            callback(error);
            dispatch({ type: 'IS_LOADING_ORCAMENTO_USUARIO', value: false });
        });
};

export default {
    requestOrcamentos,
    adicionarUsuario,
    editarUsuario,
    excluirUsuario
}
