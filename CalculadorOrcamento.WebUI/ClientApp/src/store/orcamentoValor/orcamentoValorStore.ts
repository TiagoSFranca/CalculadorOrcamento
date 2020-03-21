import { Action, Reducer } from 'redux';
import KnownAction from '../reduceTypesIndex';
import { OrcamentoValor } from './models';

export interface OrcamentoValorState {
    orcamentoValores?: OrcamentoValor[];
    orcamentoValor?: OrcamentoValor;
    search: boolean;
}

const unloadedState: OrcamentoValorState = {
    search: true,
};

export const reducer: Reducer<OrcamentoValorState> = (state: OrcamentoValorState | undefined, incomingAction: Action): OrcamentoValorState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'RECEIVE_ORCAMENTO_VALORES':
            return {
                ...state,
                orcamentoValores: action.orcamentoValores,
                search: false,
            };
        case 'ADICIONAR_ORCAMENTO_VALOR':
            return {
                ...state,
                orcamentoValor: action.orcamentoValor,
                search: true
            }
        case 'SET_SEARCH_ORCAMENTO_VALOR':
            return {
                ...state,
                search: action.value
            }
        default:
            return state;
    }
};
