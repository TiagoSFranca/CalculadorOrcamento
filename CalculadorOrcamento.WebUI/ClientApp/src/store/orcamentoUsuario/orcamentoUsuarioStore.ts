import { Action, Reducer } from 'redux';
import KnownAction from '../reduceTypesIndex';
import { OrcamentoUsuario } from './models';
import { Usuario } from 'store/auth/models';

export interface OrcamentoUsuarioState {
    isLoading: boolean;
    orcamentoUsuarios?: OrcamentoUsuario[];
    orcamentoUsuario?: OrcamentoUsuario;
    search: boolean;
    usuarios?: Usuario[];
}

const unloadedState: OrcamentoUsuarioState = {
    isLoading: false,
    search: true,
};

export const reducer: Reducer<OrcamentoUsuarioState> = (state: OrcamentoUsuarioState | undefined, incomingAction: Action): OrcamentoUsuarioState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'RECEIVE_ORCAMENTO_USUARIOS':
            return {
                ...state,
                orcamentoUsuarios: action.orcamentoUsuarios,
                search: false,
            };
        case 'ADICIONAR_ORCAMENTO_USUARIO':
            return {
                ...state,
                orcamentoUsuario: action.orcamentoUsuario,
                search: true
            }
        case 'IS_LOADING_ORCAMENTO_USUARIO':
            return {
                ...state,
                isLoading: action.value
            }
        case 'SET_SEARCH_ORCAMENTO_USUARIO':
            return {
                ...state,
                search: action.value
            }
        case 'RECEIVE_USUARIOS_ORCAMENTO_USUARIO':
            return {
                ...state,
                usuarios: action.usuarios,
            };
        default:
            return state;
    }
};
