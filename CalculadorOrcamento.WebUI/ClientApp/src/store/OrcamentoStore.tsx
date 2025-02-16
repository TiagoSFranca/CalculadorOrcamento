﻿import HTTP from 'http/index';
import { Query } from 'material-table';
import { Action, Reducer } from 'redux';
import { ConsultaPaginada, QtdPadrao } from 'utils/consultaPaginada';
import formatter from 'utils/formatter';
import { AppThunkAction } from './';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface OrcamentoState {
    isLoading: boolean;
    orcamentos?: ConsultaPaginada<Orcamento>;
    orcamento?: Orcamento;
    filtro: FiltroOrcamento;
    search: boolean;
    editarTabPrev: number;
    editarTabAct: number;
}

export interface Orcamento {
    id: number;
    codigo: string;
    nome: string;
    descricao: string;
    dataCriacao: string;
    dataAtualizacao: string;
}

export interface AdicionarOrcamento {
    nome: string;
    descricao?: string;
}

export interface EditarOrcamento {
    id: number;
    nome: string;
    descricao?: string;
}

export interface FiltroOrcamento {
    codigo: string;
    nome: string;
    descricao: string;
    dataCriacaoInicial: Date | null;
    dataCriacaoFinal: Date | null;
    dataAtualizacaoInicial: Date | null;
    dataAtualizacaoFinal: Date | null;
};

interface ReceiveOrcamentosAction {
    type: 'RECEIVE_ORCAMENTOS';
    orcamentos: ConsultaPaginada<Orcamento>;
}

interface AdicionarOrcamentoAction {
    type: 'ADICIONAR_ORCAMENTO';
    orcamento?: Orcamento;
}

interface IsLoadingOrcamentoAction {
    type: 'IS_LOADING_ORCAMENTO';
    value: boolean;
}

interface FiltrarOrcamentoAction {
    type: 'FILTAR_ORCAMENTO';
    filtro: FiltroOrcamento;
}

interface SelecionarOrcamentoAction {
    type: 'SELECIONAR_ORCAMENTO';
    orcamento?: Orcamento;
}

interface SetTabAction {
    type: 'SET_TAB_ORCAMENTO';
    prevTab: number;
    actTab: number;
}

interface SetSearchOrcamento {
    type: 'SET_SEARCH_ORCAMENTO';
    value: boolean;
}

type KnownAction = ReceiveOrcamentosAction | AdicionarOrcamentoAction | IsLoadingOrcamentoAction | FiltrarOrcamentoAction | SelecionarOrcamentoAction | SetTabAction | SetSearchOrcamento;

const BASE_URL = "orcamentos";

export const actionCreators = {
    filtrarOrcamentos: (filtro: FiltroOrcamento): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'FILTAR_ORCAMENTO', filtro: filtro });
    },
    requestOrcamentos: (callback: Function, query: Query<Orcamento>, resolve?: any): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'IS_LOADING_ORCAMENTO', value: true });

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
                dispatch({ type: 'IS_LOADING_ORCAMENTO', value: false });

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
                dispatch({ type: 'IS_LOADING_ORCAMENTO', value: false });
            });
    },

    adicionarOrcamento: (data: AdicionarOrcamento, callback: Function): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'IS_LOADING_ORCAMENTO', value: true });

        HTTP.post(`/${BASE_URL}`, JSON.stringify(data))
            .then(response => response.data as Promise<Orcamento>)
            .then(data => {
                dispatch({ type: 'ADICIONAR_ORCAMENTO', orcamento: data });
                dispatch({ type: 'IS_LOADING_ORCAMENTO', value: false });
                callback();
            }, error => {
                callback(error);
                dispatch({ type: 'IS_LOADING_ORCAMENTO', value: false });
            });
    },

    selecionarOrcamento: (id: number, callback: Function): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'IS_LOADING_ORCAMENTO', value: true });

        HTTP.get(`/${BASE_URL}/${id}`)
            .then(response => response.data as Promise<Orcamento>)
            .then(result => {
                dispatch({ type: 'ADICIONAR_ORCAMENTO', orcamento: result });
                dispatch({ type: 'IS_LOADING_ORCAMENTO', value: false });

                callback();
            }, error => {
                callback(error);
                dispatch({ type: 'IS_LOADING_ORCAMENTO', value: false });
            });
    },

    editarOrcamento: (id: number, data: EditarOrcamento, callback: Function): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'IS_LOADING_ORCAMENTO', value: true });

        HTTP.put(`/${BASE_URL}/${id}`, JSON.stringify(data))
            .then(response => response.data as Promise<Orcamento>)
            .then(data => {
                dispatch({ type: 'ADICIONAR_ORCAMENTO', orcamento: data });
                dispatch({ type: 'IS_LOADING_ORCAMENTO', value: false });
                callback();
            }, error => {
                callback(error);
                dispatch({ type: 'IS_LOADING_ORCAMENTO', value: false });
            });
    },

    setTab: (prevTab: number, actTab: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'SET_TAB_ORCAMENTO', prevTab: prevTab, actTab: actTab });
    },

    excluirOrcamento: (ids: number[], callback: (error: any, message: any) => void): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'IS_LOADING_ORCAMENTO', value: true });

        HTTP.post(`/${BASE_URL}/excluir`, { 'ids': ids })
            .then(response => response.data as Promise<string>)
            .then(data => {
                dispatch({ type: 'IS_LOADING_ORCAMENTO', value: false });
                dispatch({ type: 'SET_SEARCH_ORCAMENTO', value: true });
                callback(null, data);
            }, error => {
                callback(error, null);
                dispatch({ type: 'IS_LOADING_ORCAMENTO', value: false });
            });
    },
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: OrcamentoState = {
    isLoading: false,
    filtro: {
        codigo: '',
        nome: '',
        descricao: '',
        dataAtualizacaoFinal: null,
        dataAtualizacaoInicial: null,
        dataCriacaoFinal: null,
        dataCriacaoInicial: null,
    },
    search: false,
    editarTabPrev: 0,
    editarTabAct: 0,
};

export const reducer: Reducer<OrcamentoState> = (state: OrcamentoState | undefined, incomingAction: Action): OrcamentoState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'RECEIVE_ORCAMENTOS':
            return {
                ...state,
                orcamentos: action.orcamentos,
                search: false,
            };
        case 'ADICIONAR_ORCAMENTO':
            return {
                ...state,
                orcamento: action.orcamento
            }
        case 'IS_LOADING_ORCAMENTO':
            return {
                ...state,
                isLoading: action.value
            }
        case 'FILTAR_ORCAMENTO':
            return {
                ...state,
                filtro: action.filtro,
                search: true,
            }
        case 'SET_TAB_ORCAMENTO':
            return {
                ...state,
                editarTabPrev: action.prevTab,
                editarTabAct: action.actTab,
            }
        case 'SET_SEARCH_ORCAMENTO':
            return {
                ...state,
                search: action.value
            }
        default:
            return state;
    }
};
