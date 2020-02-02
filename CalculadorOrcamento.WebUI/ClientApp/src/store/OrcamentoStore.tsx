import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';
import HTTP from 'http/index';
import ConsultaPaginada from 'utils/consultaPaginada'

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface OrcamentoState {
    isLoading: boolean;
    startDateIndex?: number;
    orcamentos: Orcamento[];
    orcamento?: Orcamento;
}

export interface Orcamento {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
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
    startDateIndex: number;
}

interface ReceiveOrcamentosAction {
    type: 'RECEIVE_ORCAMENTOS';
    startDateIndex: number;
    orcamentos: Orcamento[];
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
    requestOrcamentos: (startDateIndex: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'IS_LOADING_ORCAMENTO', value: true });
        const appState = getState();
        if (appState && appState.weatherForecasts && startDateIndex !== appState.weatherForecasts.startDateIndex) {
            HTTP.get(`/orcamentos`)
                .then(response => response.data as Promise<ConsultaPaginada<Orcamento>>)
                .then(data => {
                    console.log(data);
                    dispatch({ type: 'RECEIVE_ORCAMENTOS', startDateIndex: startDateIndex, orcamentos: data.itens });
                    dispatch({ type: 'IS_LOADING_ORCAMENTO', value: false });
                }, error => {
                    dispatch({ type: 'IS_LOADING_ORCAMENTO', value: false });
                });

            dispatch({ type: 'REQUEST_ORCAMENTOS', startDateIndex: startDateIndex });
        }
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

const unloadedState: OrcamentoState = { orcamentos: [], isLoading: false };

export const reducer: Reducer<OrcamentoState> = (state: OrcamentoState | undefined, incomingAction: Action): OrcamentoState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_ORCAMENTOS':
            return {
                ...state,
                startDateIndex: action.startDateIndex,
                orcamentos: state.orcamentos,
            };
        case 'RECEIVE_ORCAMENTOS':
            return {
                ...state,
                startDateIndex: action.startDateIndex,
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
