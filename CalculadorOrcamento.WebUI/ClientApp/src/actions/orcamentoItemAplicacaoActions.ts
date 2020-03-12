import HTTP from 'http/index';
import { AppThunkAction } from 'store/index';
import { AdicionarOrcamentoItem, EditarOrcamentoItemAplicacao, OrcamentoItemAplicacao } from "store/orcamentoItemAplicacao/models";
import KnownAction from "store/reduceTypesIndex";

const BASE_URL = "orcamentoItensAplicacao";

const requestOrcamentos = (callback: Function, idOrcamento: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
    dispatch({ type: 'IS_LOADING_ORCAMENTO_ITEM', value: true });

    HTTP.get(`/${BASE_URL}?idOrcamento=${idOrcamento}`)
        .then(response => response.data as Promise<OrcamentoItemAplicacao[]>)
        .then(result => {
            dispatch({ type: 'RECEIVE_ORCAMENTO_ITENS', orcamentoItens: result });
            dispatch({ type: 'IS_LOADING_ORCAMENTO_ITEM', value: false });

            callback();
        }, error => {
            callback(error);
            dispatch({ type: 'IS_LOADING_ORCAMENTO_ITEM', value: false });
        });
};

const adicionarItem = (data: AdicionarOrcamentoItem, callback: Function): AppThunkAction<KnownAction> => (dispatch) => {
    dispatch({ type: 'IS_LOADING_ORCAMENTO_ITEM', value: true });

    HTTP.post(`/${BASE_URL}`, JSON.stringify(data))
        .then(response => response.data as Promise<OrcamentoItemAplicacao>)
        .then(data => {
            dispatch({ type: 'ADICIONAR_ORCAMENTO_ITEM', orcamentoItem: data });
            dispatch({ type: 'IS_LOADING_ORCAMENTO_ITEM', value: false });
            callback();
        }, error => {
            callback(error);
            dispatch({ type: 'IS_LOADING_ORCAMENTO_ITEM', value: false });
        });
};

const editarItem = (id: number, data: EditarOrcamentoItemAplicacao, callback: Function): AppThunkAction<KnownAction> => (dispatch) => {
    dispatch({ type: 'IS_LOADING_ORCAMENTO_ITEM', value: true });

    HTTP.put(`/${BASE_URL}/${id}`, JSON.stringify(data))
        .then(response => response.data as Promise<OrcamentoItemAplicacao>)
        .then(data => {
            dispatch({ type: 'ADICIONAR_ORCAMENTO_ITEM', orcamentoItem: data });
            dispatch({ type: 'IS_LOADING_ORCAMENTO_ITEM', value: false });
            callback();
        }, error => {
            callback(error);
            dispatch({ type: 'IS_LOADING_ORCAMENTO_ITEM', value: false });
        });
};

const excluirItem = (id: number, callback: Function): AppThunkAction<KnownAction> => (dispatch) => {
    dispatch({ type: 'IS_LOADING_ORCAMENTO_ITEM', value: true });

    HTTP.delete(`/${BASE_URL}/${id}`)
        .then(response => response.data as Promise<OrcamentoItemAplicacao>)
        .then(data => {
            dispatch({ type: 'SET_SEARCH_ORCAMENTO_ITEM', value: true });
            dispatch({ type: 'IS_LOADING_ORCAMENTO_ITEM', value: false });
            callback();
        }, error => {
            callback(error);
            dispatch({ type: 'IS_LOADING_ORCAMENTO_ITEM', value: false });
        });
};

export default {
    requestOrcamentos,
    adicionarItem,
    editarItem,
    excluirItem
}