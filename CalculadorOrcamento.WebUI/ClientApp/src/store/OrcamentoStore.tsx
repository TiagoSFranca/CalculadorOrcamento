import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';
import HTTP from 'http/index';
import { ConsultaPaginada, Quantidades, QtdPadrao } from 'utils/consultaPaginada'

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface OrcamentoState {
    isLoading: boolean;
    orcamentos?: ConsultaPaginada<Orcamento>;
    orcamento?: Orcamento;
    pagina: number;
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

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestOrcamentosAction {
    type: 'REQUEST_ORCAMENTOS';
    pagina: number;
}

interface ReceiveOrcamentosAction {
    type: 'RECEIVE_ORCAMENTOS';
    orcamentos: ConsultaPaginada<Orcamento>;
}

interface AdicionarOrcamentoAction {
    type: 'ADICIONAR_ORCAMENTO';
    orcamento?: Orcamento;
}

interface IsLoadingAction {
    type: 'IS_LOADING_ORCAMENTO',
    value: boolean
}

type KnownAction = RequestOrcamentosAction | ReceiveOrcamentosAction | AdicionarOrcamentoAction | IsLoadingAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestOrcamentos: (callback: Function, pagina?: number | null, qtdPorPagina?: number | null): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'IS_LOADING_ORCAMENTO', value: true });

        HTTP.get(`/orcamentos?itensPorPagina=${qtdPorPagina ? qtdPorPagina : QtdPadrao.qtd}&pagina=${pagina ? pagina : 1}`)
            .then(response => response.data as Promise<ConsultaPaginada<Orcamento>>)
            .then(data => {
                dispatch({ type: 'RECEIVE_ORCAMENTOS', orcamentos: data });
                dispatch({ type: 'IS_LOADING_ORCAMENTO', value: false });
                callback();
            }, error => {
                callback(error);
                dispatch({ type: 'IS_LOADING_ORCAMENTO', value: false });
            });

    },

    adicionarOrcamento: (data: AdicionarOrcamento, callback: Function): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'IS_LOADING_ORCAMENTO', value: true });

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

const unloadedState: OrcamentoState = { isLoading: false, pagina: 1 };

export const reducer: Reducer<OrcamentoState> = (state: OrcamentoState | undefined, incomingAction: Action): OrcamentoState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_ORCAMENTOS':
            return {
                ...state,
                pagina: action.pagina,
            };
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
        default:
            return state;
    }
};
