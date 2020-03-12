import { Action, Reducer } from 'redux';
import KnownAction from '../reduceTypesIndex';
import { OrcamentoItemAplicacao } from './models';

export interface OrcamentoItemAplicacaoState {
    isLoading: boolean;
    orcamentoItens?: OrcamentoItemAplicacao[];
    orcamentoItem?: OrcamentoItemAplicacao;
    search: boolean;
}

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
