import HTTP from 'http/index';
import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface OrcamentoPermissaoState {
    isLoading: boolean;
    orcamentoPermissoes?: OrcamentoPermissao[];
    orcamentoPermissao?: OrcamentoPermissao;
    search: boolean;
}

export interface OrcamentoPermissao {
    id: number;
    nome: string;
    descricao: string;
}

interface ReceiveOrcamentoPermissoesAction {
    type: 'RECEIVE_ORCAMENTO_PERMISSOES';
    orcamentoPermissoes: OrcamentoPermissao[];
}

interface IsLoadingOrcamentoPermissaoAction {
    type: 'IS_LOADING_ORCAMENTO_PERMISSAO';
    value: boolean;
}

interface SetSearchOrcamentoPermissao {
    type: 'SET_SEARCH_ORCAMENTO_PERMISSAO';
    value: boolean;
}

type KnownAction = ReceiveOrcamentoPermissoesAction | IsLoadingOrcamentoPermissaoAction | SetSearchOrcamentoPermissao;

const BASE_URL = "orcamentoPermissoes";

export const actionCreators = {
    requestOrcamentos: (callback: Function): AppThunkAction<KnownAction> => (dispatch, getState) => {
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
    },
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: OrcamentoPermissaoState = {
    isLoading: false,
    search: true,
};

export const reducer: Reducer<OrcamentoPermissaoState> = (state: OrcamentoPermissaoState | undefined, incomingAction: Action): OrcamentoPermissaoState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'RECEIVE_ORCAMENTO_PERMISSOES':
            return {
                ...state,
                orcamentoPermissoes: action.orcamentoPermissoes,
                search: false,
            };
        case 'IS_LOADING_ORCAMENTO_PERMISSAO':
            return {
                ...state,
                isLoading: action.value
            }
        case 'SET_SEARCH_ORCAMENTO_PERMISSAO':
            return {
                ...state,
                search: action.value
            }
        default:
            return state;
    }
};
