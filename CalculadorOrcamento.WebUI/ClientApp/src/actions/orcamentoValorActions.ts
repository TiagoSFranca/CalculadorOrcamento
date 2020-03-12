import HTTP from 'http/index';
import { AppThunkAction } from 'store/index';
import { AdicionarOrcamentoValor, EditarOrcamentoValor, OrcamentoValor } from "store/orcamentoValor/models";
import KnownAction from 'store/reduceTypesIndex';

const BASE_URL = "orcamentoValores";

const requestOrcamentos = (callback: Function, idOrcamento: number): AppThunkAction<KnownAction> => (dispatch) => {
    dispatch({ type: 'IS_LOADING_ORCAMENTO_VALOR', value: true });

    HTTP.get(`/${BASE_URL}?idOrcamento=${idOrcamento}`)
        .then(response => response.data as Promise<OrcamentoValor[]>)
        .then(result => {
            dispatch({ type: 'RECEIVE_ORCAMENTO_VALORES', orcamentoValores: result });
            dispatch({ type: 'IS_LOADING_ORCAMENTO_VALOR', value: false });

            callback();
        }, error => {
            callback(error);
            dispatch({ type: 'IS_LOADING_ORCAMENTO_VALOR', value: false });
        });
};

const adicionarItem = (data: AdicionarOrcamentoValor, callback: Function): AppThunkAction<KnownAction> => (dispatch) => {
    dispatch({ type: 'IS_LOADING_ORCAMENTO_VALOR', value: true });

    HTTP.post(`/${BASE_URL}`, JSON.stringify(data))
        .then(response => response.data as Promise<OrcamentoValor>)
        .then(data => {
            dispatch({ type: 'ADICIONAR_ORCAMENTO_VALOR', orcamentoValor: data });
            dispatch({ type: 'IS_LOADING_ORCAMENTO_VALOR', value: false });
            callback();
        }, error => {
            callback(error);
            dispatch({ type: 'IS_LOADING_ORCAMENTO_VALOR', value: false });
        });
};

const editarItem = (id: number, data: EditarOrcamentoValor, callback: Function): AppThunkAction<KnownAction> => (dispatch) => {
    dispatch({ type: 'IS_LOADING_ORCAMENTO_VALOR', value: true });

    HTTP.put(`/${BASE_URL}/${id}`, JSON.stringify(data))
        .then(response => response.data as Promise<OrcamentoValor>)
        .then(data => {
            dispatch({ type: 'ADICIONAR_ORCAMENTO_VALOR', orcamentoValor: data });
            dispatch({ type: 'IS_LOADING_ORCAMENTO_VALOR', value: false });
            callback();
        }, error => {
            callback(error);
            dispatch({ type: 'IS_LOADING_ORCAMENTO_VALOR', value: false });
        });
};

const excluirItem = (id: number, callback: Function): AppThunkAction<KnownAction> => (dispatch) => {
    dispatch({ type: 'IS_LOADING_ORCAMENTO_VALOR', value: true });

    HTTP.delete(`/${BASE_URL}/${id}`)
        .then(response => response.data as Promise<OrcamentoValor>)
        .then(data => {
            dispatch({ type: 'SET_SEARCH_ORCAMENTO_VALOR', value: true });
            dispatch({ type: 'IS_LOADING_ORCAMENTO_VALOR', value: false });
            callback();
        }, error => {
            callback(error);
            dispatch({ type: 'IS_LOADING_ORCAMENTO_VALOR', value: false });
        });
};

export default {
    requestOrcamentos,
    adicionarItem,
    editarItem,
    excluirItem
}