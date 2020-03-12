import HTTP from "http/index";
import { AppThunkAction } from 'store/index';
import { OrcamentoPermissao } from "store/orcamentoPermissao/models";
import KnownAction from 'store/reduceTypesIndex';

const BASE_URL = "orcamentoPermissoes";

const requestOrcamentos = (callback: Function): AppThunkAction<KnownAction> => (dispatch) => {
    dispatch({ type: 'IS_LOADING_ORCAMENTO_PERMISSAO', value: true });

    HTTP.get(`/${BASE_URL}`)
        .then(response => response.data as Promise<OrcamentoPermissao[]>)
        .then(result => {
            dispatch({ type: 'RECEIVE_ORCAMENTO_PERMISSOES', orcamentoPermissoes: result });
            dispatch({ type: 'IS_LOADING_ORCAMENTO_PERMISSAO', value: false });

            callback();
        }, error => {
            callback(error);
            dispatch({ type: 'IS_LOADING_ORCAMENTO_PERMISSAO', value: false });
        });
};

export default {
    requestOrcamentos
}