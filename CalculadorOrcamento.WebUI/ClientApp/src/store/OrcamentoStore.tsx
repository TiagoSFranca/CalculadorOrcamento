import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';
import HTTP from 'http/index';
import { ConsultaPaginada, Quantidades, QtdPadrao } from 'utils/consultaPaginada'
import { QueryResult, Query } from 'material-table';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface OrcamentoState {
    isLoading: boolean;
    orcamentos?: ConsultaPaginada<Orcamento>;
    orcamento?: Orcamento;
    search: boolean;
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

interface ReceiveOrcamentosAction {
    type: 'RECEIVE_ORCAMENTOS';
    orcamentos: ConsultaPaginada<Orcamento>;
}

interface AdicionarOrcamentoAction {
    type: 'ADICIONAR_ORCAMENTO';
    orcamento?: Orcamento;
}

interface IsLoadingOrcamentoAction {
    type: 'IS_LOADING_ORCAMENTO',
    value: boolean
}

interface SearchOrcamentoAction {
    type: 'IS_SEARCH_ORCAMENTO',
    value: boolean
}

type KnownAction = ReceiveOrcamentosAction | AdicionarOrcamentoAction | IsLoadingOrcamentoAction | SearchOrcamentoAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestOrcamentos: (callback: Function, query: Query<Orcamento>, resolve?: any): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'IS_LOADING_ORCAMENTO', value: true });
        dispatch({ type: 'IS_SEARCH_ORCAMENTO', value: false });

        let qtdPorPagina = query.pageSize || query.pageSize >= QtdPadrao.qtd ? query.pageSize : QtdPadrao.qtd;
        let pagina = query.page + 1;

        HTTP.get(`/orcamentos?itensPorPagina=${qtdPorPagina}&pagina=${pagina}`)
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
                        page: 0,
                        totalCount: 0,
                    })
                dispatch({ type: 'IS_LOADING_ORCAMENTO', value: false });
            });

    },

    adicionarOrcamento: (data: AdicionarOrcamento, callback: Function): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'IS_LOADING_ORCAMENTO', value: true });
        dispatch({ type: 'IS_SEARCH_ORCAMENTO', value: true });

        HTTP.post(`/orcamentos`, JSON.stringify(data))
            .then(response => response.data as Promise<Orcamento>)
            .then(data => {
                dispatch({ type: 'ADICIONAR_ORCAMENTO', orcamento: data });
                dispatch({ type: 'IS_LOADING_ORCAMENTO', value: false });
                callback();
            }, error => {
                callback(error);
                dispatch({ type: 'IS_LOADING_ORCAMENTO', value: false });
            });
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: OrcamentoState = { isLoading: false, search: true };

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
        case 'IS_SEARCH_ORCAMENTO':
            return {
                ...state,
                search: action.value
            }
        default:
            return state;
    }
};
