import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface OrcamentoState {
    isLoading: boolean;
    startDateIndex?: number;
    orcamentos: Orcamento[];
}

export interface Orcamento {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
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

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestOrcamentosAction | ReceiveOrcamentosAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestOrcamentos: (startDateIndex: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const appState = getState();
        if (appState && appState.weatherForecasts && startDateIndex !== appState.weatherForecasts.startDateIndex) {
            fetch(`api/orcamentos`)
                .then(response => response.json() as Promise<Orcamento[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_ORCAMENTOS', startDateIndex: startDateIndex, orcamentos: data });
                });

            dispatch({ type: 'REQUEST_ORCAMENTOS', startDateIndex: startDateIndex });
        }
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
                startDateIndex: action.startDateIndex,
                orcamentos: state.orcamentos,
                isLoading: true
            };
        case 'RECEIVE_ORCAMENTOS':
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            if (action.startDateIndex === state.startDateIndex) {
                return {
                    startDateIndex: action.startDateIndex,
                    orcamentos: action.orcamentos,
                    isLoading: false
                };
            }
            break;
    }

    return state;
};
