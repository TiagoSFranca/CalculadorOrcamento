import { Action, Reducer } from 'redux';
import KnownAction from '../reduceTypesIndex';
import { OrcamentoPermissao } from './models';

export interface OrcamentoPermissaoState {
    isLoading: boolean;
    orcamentoPermissoes?: OrcamentoPermissao[];
    search: boolean;
}

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
