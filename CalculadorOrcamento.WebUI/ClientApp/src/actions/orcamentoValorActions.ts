import HTTP from 'http/index';
import { AppThunkAction } from 'store/index';
import { AdicionarOrcamentoValor, EditarOrcamentoValor, OrcamentoValor } from "store/orcamentoValor/models";
import KnownAction from 'store/reduceTypesIndex';
import { dispatchSnackBar, sucessoPadrao } from 'utils/snackBar';

const BASE_URL = "orcamentoValores";

const requestOrcamentoValores = (callback: Function, idOrcamento: number): AppThunkAction<KnownAction> => (dispatch) => {
    dispatch({ type: 'IS_LOADING_APP', value: true });

    HTTP.get(`/${BASE_URL}?idOrcamento=${idOrcamento}`)
        .then(response => response.data as Promise<OrcamentoValor[]>)
        .then(result => {
            dispatch({ type: 'RECEIVE_ORCAMENTO_VALORES', orcamentoValores: result });
            dispatch({ type: 'IS_LOADING_APP', value: false });

            callback();
        }, error => {
            callback(error);
            dispatch({ type: 'IS_LOADING_APP', value: false });
        });
};

const adicionarOrcamentoValor = (data: AdicionarOrcamentoValor, callback: (sucesso: boolean) => void, loadingIdentifier: string): AppThunkAction<KnownAction> => (dispatch) => {
    dispatch({ type: 'IS_LOADING_APP', value: true });
    dispatch({ type: 'SET_LOADING_COMPONENT', item: { name: loadingIdentifier, loading: true } });

    HTTP.post(`/${BASE_URL}`, JSON.stringify(data))
        .then(response => response.data as Promise<OrcamentoValor>)
        .then(data => {
            dispatch({ type: 'ADICIONAR_ORCAMENTO_VALOR', orcamentoValor: data });
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

const editarOrcamentoValor = (id: number, data: EditarOrcamentoValor, callback: (sucesso: boolean) => void, loadingIdentifier: string): AppThunkAction<KnownAction> => (dispatch) => {
    dispatch({ type: 'IS_LOADING_APP', value: true });
    dispatch({ type: 'SET_LOADING_COMPONENT', item: { name: loadingIdentifier, loading: true } });

    HTTP.put(`/${BASE_URL}/${id}`, JSON.stringify(data))
        .then(response => response.data as Promise<OrcamentoValor>)
        .then(data => {
            dispatch({ type: 'ADICIONAR_ORCAMENTO_VALOR', orcamentoValor: data });
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

const excluirOrcamentoValor = (id: number, callback: (sucesso: boolean) => void, loadingIdentifier: string): AppThunkAction<KnownAction> => (dispatch) => {
    dispatch({ type: 'IS_LOADING_APP', value: true });
    dispatch({ type: 'SET_LOADING_COMPONENT', item: { name: loadingIdentifier, loading: true } });

    HTTP.delete(`/${BASE_URL}/${id}`)
        .then(response => response.data as Promise<OrcamentoValor>)
        .then(data => {
            dispatch({ type: 'SET_SEARCH_ORCAMENTO_VALOR', value: true });
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
    requestOrcamentoValores,
    adicionarOrcamentoValor,
    editarOrcamentoValor,
    excluirOrcamentoValor
}