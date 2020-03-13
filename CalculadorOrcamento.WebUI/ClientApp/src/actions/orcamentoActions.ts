import HTTP from 'http/index';
import { Query } from 'material-table';
import { AppThunkAction } from 'store/index';
import { AdicionarOrcamento, EditarOrcamento, FiltroOrcamento, Orcamento } from "store/orcamento/models";
import KnownAction from "store/reduceTypesIndex";
import { ConsultaPaginada, QtdPadrao } from "utils/consultaPaginada";
import formatter from "utils/formatter";

const BASE_URL = "orcamentos";

const filtrarOrcamentos = (filtro: FiltroOrcamento): AppThunkAction<KnownAction> => (dispatch) => {
    dispatch({ type: 'FILTAR_ORCAMENTO', filtro: filtro });
};

const requestOrcamentos = (callback: Function, query: Query<Orcamento>, resolve?: any): AppThunkAction<KnownAction> => (dispatch, getState) => {
    dispatch({ type: 'IS_LOADING_APP', value: true });

    let filtro = getState().orcamento.filtro;
    let qtdPorPagina = query.pageSize || query.pageSize >= QtdPadrao.qtd ? query.pageSize : QtdPadrao.qtd;
    let pagina = getState().orcamento.search ? 1 : query.page + 1;

    HTTP.get(`/${BASE_URL}?itensPorPagina=${qtdPorPagina}&pagina=${pagina}&asc=${query.orderDirection !== "desc" ? true : false}
&ordenarPor=${encodeURIComponent(query.orderBy && query.orderBy.field ? query.orderBy.field : "")}&codigo=${encodeURIComponent(filtro.codigo)}
&nome=${encodeURIComponent(filtro.nome)}&descricao=${encodeURIComponent(filtro.descricao)}&dataCriacaoInicial=${formatter.formatarDataRequest(filtro.dataCriacaoInicial)}
&dataCriacaoFinal=${formatter.formatarDataRequest(filtro.dataCriacaoFinal)}&dataAtualizacaoInicial=${formatter.formatarDataRequest(filtro.dataAtualizacaoInicial)}&dataAtualizacaoFinal=${formatter.formatarDataRequest(filtro.dataAtualizacaoFinal)}`)
        .then(response => response.data as Promise<ConsultaPaginada<Orcamento>>)
        .then(result => {
            dispatch({ type: 'RECEIVE_ORCAMENTOS', orcamentos: result });
            dispatch({ type: 'IS_LOADING_APP', value: false });

            if (resolve) {
                resolve({
                    data: result.itens,
                    page: result.pagina - 1,
                    totalCount: result.totalItens,
                })
            }

            callback();
        }, error => {
            callback(error);
            if (resolve)
                resolve({
                    data: [],
                    page: 0,
                    totalCount: 0,
                })
            dispatch({ type: 'IS_LOADING_APP', value: false });
        });
};

const adicionarOrcamento = (data: AdicionarOrcamento, callback: Function, loadingIdentifier: string): AppThunkAction<KnownAction> => (dispatch) => {
    dispatch({ type: 'IS_LOADING_APP', value: true });
    dispatch({ type: 'SET_LOADING_COMPONENT', item: { name: loadingIdentifier, loading: true } });

    HTTP.post(`/${BASE_URL}`, JSON.stringify(data))
        .then(response => response.data as Promise<Orcamento>)
        .then(data => {
            dispatch({ type: 'ADICIONAR_ORCAMENTO', orcamento: data });
            dispatch({ type: 'IS_LOADING_APP', value: false });
            dispatch({ type: 'SET_LOADING_COMPONENT', item: { name: loadingIdentifier, loading: false } });
            callback();
        }, error => {
            callback(error);
            dispatch({ type: 'IS_LOADING_APP', value: false });
            dispatch({ type: 'SET_LOADING_COMPONENT', item: { name: loadingIdentifier, loading: false } });
        });
};

const selecionarOrcamento = (id: number, callback: Function): AppThunkAction<KnownAction> => (dispatch) => {
    dispatch({ type: 'IS_LOADING_APP', value: true });

    HTTP.get(`/${BASE_URL}/${id}`)
        .then(response => response.data as Promise<Orcamento>)
        .then(result => {
            dispatch({ type: 'ADICIONAR_ORCAMENTO', orcamento: result });
            dispatch({ type: 'IS_LOADING_APP', value: false });

            callback();
        }, error => {
            callback(error);
            dispatch({ type: 'IS_LOADING_APP', value: false });
        });
};

const editarOrcamento = (id: number, data: EditarOrcamento, callback: Function, loadingIdentifier: string): AppThunkAction<KnownAction> => (dispatch) => {
    dispatch({ type: 'IS_LOADING_APP', value: true });
    dispatch({ type: 'SET_LOADING_COMPONENT', item: { name: loadingIdentifier, loading: true } });

    HTTP.put(`/${BASE_URL}/${id}`, JSON.stringify(data))
        .then(response => response.data as Promise<Orcamento>)
        .then(data => {
            dispatch({ type: 'ADICIONAR_ORCAMENTO', orcamento: data });
            dispatch({ type: 'IS_LOADING_APP', value: false });
            dispatch({ type: 'SET_LOADING_COMPONENT', item: { name: loadingIdentifier, loading: false } });
            callback();
        }, error => {
            callback(error);
            dispatch({ type: 'IS_LOADING_APP', value: false });
            dispatch({ type: 'SET_LOADING_COMPONENT', item: { name: loadingIdentifier, loading: false } });
        });
};

const setTab = (prevTab: number, actTab: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
    dispatch({ type: 'SET_TAB_ORCAMENTO', prevTab: prevTab, actTab: actTab });
};

const excluirOrcamento = (ids: number[], callback: (error: any, message: any) => void, loadingIdentifier: string): AppThunkAction<KnownAction> => (dispatch) => {
    dispatch({ type: 'IS_LOADING_APP', value: true });
    dispatch({ type: 'SET_LOADING_COMPONENT', item: { name: loadingIdentifier, loading: true } });

    HTTP.post(`/${BASE_URL}/excluir`, { 'ids': ids })
        .then(response => response.data as Promise<string>)
        .then(data => {
            dispatch({ type: 'IS_LOADING_APP', value: false });
            dispatch({ type: 'SET_SEARCH_ORCAMENTO', value: true });
            dispatch({ type: 'SET_LOADING_COMPONENT', item: { name: loadingIdentifier, loading: false } });
            callback(null, data);
        }, error => {
            callback(error, null);
            dispatch({ type: 'IS_LOADING_APP', value: false });
            dispatch({ type: 'SET_LOADING_COMPONENT', item: { name: loadingIdentifier, loading: false } });
        });
};

export default {
    filtrarOrcamentos,
    requestOrcamentos,
    adicionarOrcamento,
    selecionarOrcamento,
    editarOrcamento,
    setTab,
    excluirOrcamento,
}