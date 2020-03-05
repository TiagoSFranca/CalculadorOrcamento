import HTTP from 'http/index';
import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface OrcamentoItemAplicacaoState {
    isLoading: boolean;
    orcamentoItens?: OrcamentoItemAplicacao[];
    orcamentoItem?: OrcamentoItemAplicacao;
    search: boolean;
}

export interface OrcamentoItemAplicacao {
    id: number;
    idOrcamento: number;
    codigo: string;
    nome: string;
    descricao: string;
    observacao: string;
    dataCriacao: string;
    dataAtualizacao: string;
    duracaoBack?: number;
    duracaoFront?: number;
    duracaoTotal?: number;
}

export interface AdicionarOrcamentoItem {
    idOrcamento: number;
    nome: string;
    descricao?: string;
    observavao?: string;
    duracaoBack?: number;
    duracaoFront?: number;
    duracaoTotal?: number;
}

export interface EditarOrcamentoItem {
    id: number;
    idOrcamento: number;
    nome: string;
    descricao?: string;
    observavao?: string;
    duracaoBack?: number;
    duracaoFront?: number;
    duracaoTotal?: number;
}

interface ReceiveOrcamentoItensAction {
    type: 'RECEIVE_ORCAMENTO_ITENS';
    orcamentoItens: OrcamentoItemAplicacao[];
}

interface AdicionarOrcamentoItemAction {
    type: 'ADICIONAR_ORCAMENTO_ITEM';
    orcamentoItem?: OrcamentoItemAplicacao;
}

interface IsLoadingOrcamentoItemAction {
    type: 'IS_LOADING_ORCAMENTO_ITEM';
    value: boolean;
}

interface SetSearchOrcamentoItem {
    type: 'SET_SEARCH_ORCAMENTO_ITEM';
    value: boolean;
}

type KnownAction = ReceiveOrcamentoItensAction | AdicionarOrcamentoItemAction | IsLoadingOrcamentoItemAction | SetSearchOrcamentoItem;

export const actionCreators = {
    requestOrcamentos: (callback: Function, idOrcamento: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'IS_LOADING_ORCAMENTO_ITEM', value: true });

        HTTP.get(`/orcamentoitensaplicacao?idOrcamento=${idOrcamento}`)
            .then(response => response.data as Promise<OrcamentoItemAplicacao[]>)
            .then(result => {
                dispatch({ type: 'RECEIVE_ORCAMENTO_ITENS', orcamentoItens: result });
                dispatch({ type: 'IS_LOADING_ORCAMENTO_ITEM', value: false });

                callback();
            }, error => {
                callback(error);
                dispatch({ type: 'IS_LOADING_ORCAMENTO_ITEM', value: false });
            });
    },

    adicionarItem: (data: AdicionarOrcamentoItem, callback: Function): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'IS_LOADING_ORCAMENTO_ITEM', value: true });

        HTTP.post(`/orcamentoitensaplicacao`, JSON.stringify(data))
            .then(response => response.data as Promise<OrcamentoItemAplicacao>)
            .then(data => {
                dispatch({ type: 'ADICIONAR_ORCAMENTO_ITEM', orcamentoItem: data });
                dispatch({ type: 'IS_LOADING_ORCAMENTO_ITEM', value: false });
                callback();
            }, error => {
                callback(error);
                dispatch({ type: 'IS_LOADING_ORCAMENTO_ITEM', value: false });
            });
    },

    editarItem: (id: number, data: EditarOrcamentoItem, callback: Function): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'IS_LOADING_ORCAMENTO_ITEM', value: true });

        HTTP.put(`/orcamentoitensaplicacao/${id}`, JSON.stringify(data))
            .then(response => response.data as Promise<OrcamentoItemAplicacao>)
            .then(data => {
                dispatch({ type: 'ADICIONAR_ORCAMENTO_ITEM', orcamentoItem: data });
                dispatch({ type: 'IS_LOADING_ORCAMENTO_ITEM', value: false });
                callback();
            }, error => {
                callback(error);
                dispatch({ type: 'IS_LOADING_ORCAMENTO_ITEM', value: false });
            });
    },

    excluirItem: (id: number, callback: Function): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'IS_LOADING_ORCAMENTO_ITEM', value: true });

        HTTP.delete(`/orcamentoitensaplicacao/${id}`)
            .then(response => response.data as Promise<OrcamentoItemAplicacao>)
            .then(data => {
                dispatch({ type: 'SET_SEARCH_ORCAMENTO_ITEM', value: true });
                dispatch({ type: 'IS_LOADING_ORCAMENTO_ITEM', value: false });
                callback();
            }, error => {
                callback(error);
                dispatch({ type: 'IS_LOADING_ORCAMENTO_ITEM', value: false });
            });
    },
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: OrcamentoItemAplicacaoState = {
    isLoading: false,
    search: true,
};

export const reducer: Reducer<OrcamentoItemAplicacaoState> = (state: OrcamentoItemAplicacaoState | undefined, incomingAction: Action): OrcamentoItemAplicacaoState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'RECEIVE_ORCAMENTO_ITENS':
            return {
                ...state,
                orcamentoItens: action.orcamentoItens,
                search: false,
            };
        case 'ADICIONAR_ORCAMENTO_ITEM':
            return {
                ...state,
                orcamentoItem: action.orcamentoItem,
                search: true
            }
        case 'IS_LOADING_ORCAMENTO_ITEM':
            return {
                ...state,
                isLoading: action.value
            }
        case 'SET_SEARCH_ORCAMENTO_ITEM':
            return {
                ...state,
                search: action.value
            }
        default:
            return state;
    }
};
