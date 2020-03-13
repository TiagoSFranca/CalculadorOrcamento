﻿import HTTP from 'http/index';
import { AppThunkAction } from 'store/index';
import { AdicionarOrcamentoItem, EditarOrcamentoItemAplicacao, OrcamentoItemAplicacao } from "store/orcamentoItemAplicacao/models";
import KnownAction from "store/reduceTypesIndex";
import { dispatchSnackBar, sucessoPadrao } from 'utils/snackBar';

const BASE_URL = "orcamentoItensAplicacao";

const requestOrcamentoItensAplicacao = (callback: Function, idOrcamento: number): AppThunkAction<KnownAction> => (dispatch) => {
    dispatch({ type: 'IS_LOADING_APP', value: true });

    HTTP.get(`/${BASE_URL}?idOrcamento=${idOrcamento}`)
        .then(response => response.data as Promise<OrcamentoItemAplicacao[]>)
        .then(result => {
            dispatch({ type: 'RECEIVE_ORCAMENTO_ITENS', orcamentoItens: result });
            dispatch({ type: 'IS_LOADING_APP', value: false });

            callback();
        }, error => {
            callback(error);
            dispatch({ type: 'IS_LOADING_APP', value: false });
        });
};

const adicionarOrcamentoItemAplicacao =
    (data: AdicionarOrcamentoItem, callback: (sucesso: boolean) => void, loadingIdentifier: string): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'IS_LOADING_APP', value: true });
        dispatch({ type: 'SET_LOADING_COMPONENT', item: { name: loadingIdentifier, loading: true } });

        HTTP.post(`/${BASE_URL}`, JSON.stringify(data))
            .then(response => response.data as Promise<OrcamentoItemAplicacao>)
            .then(data => {
                dispatch({ type: 'IS_LOADING_APP', value: false });
                dispatch({ type: 'SET_LOADING_COMPONENT', item: { name: loadingIdentifier, loading: false } });
                dispatch({ type: 'ADICIONAR_ORCAMENTO_ITEM', orcamentoItem: data });
                dispatch(sucessoPadrao());

                callback(true);
            }, error => {
                dispatch(dispatchSnackBar(null, error));
                dispatch({ type: 'IS_LOADING_APP', value: false });
                dispatch({ type: 'SET_LOADING_COMPONENT', item: { name: loadingIdentifier, loading: false } });

                callback(false);
            });
    };

const editarOrcamentoItemAplicacao = (id: number, data: EditarOrcamentoItemAplicacao, callback: (sucesso: boolean) => void, loadingIdentifier: string): AppThunkAction<KnownAction> => (dispatch) => {
    dispatch({ type: 'IS_LOADING_APP', value: true });
    dispatch({ type: 'SET_LOADING_COMPONENT', item: { name: loadingIdentifier, loading: true } });

    HTTP.put(`/${BASE_URL}/${id}`, JSON.stringify(data))
        .then(response => response.data as Promise<OrcamentoItemAplicacao>)
        .then(data => {
            dispatch({ type: 'ADICIONAR_ORCAMENTO_ITEM', orcamentoItem: data });
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

const excluirOrcamentoItemAplicacao = (id: number, callback: (sucesso: boolean) => void, loadingIdentifier: string): AppThunkAction<KnownAction> => (dispatch) => {
    dispatch({ type: 'IS_LOADING_APP', value: true });
    dispatch({ type: 'SET_LOADING_COMPONENT', item: { name: loadingIdentifier, loading: true } });

    HTTP.delete(`/${BASE_URL}/${id}`)
        .then(response => response.data as Promise<OrcamentoItemAplicacao>)
        .then(data => {
            dispatch({ type: 'SET_SEARCH_ORCAMENTO_ITEM', value: true });
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

export default {
    requestOrcamentoItensAplicacao,
    adicionarOrcamentoItemAplicacao,
    editarOrcamentoItemAplicacao,
    excluirOrcamentoItemAplicacao
}