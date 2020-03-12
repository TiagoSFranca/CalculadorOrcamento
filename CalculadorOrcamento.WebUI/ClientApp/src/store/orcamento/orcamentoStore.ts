import { Action, Reducer } from 'redux';
import { ConsultaPaginada } from '../../utils/consultaPaginada';
import KnownAction from '../reduceTypesIndex';
import { FiltroOrcamento, Orcamento } from './models';

export interface OrcamentoState {
    isLoading: boolean;
    orcamentos?: ConsultaPaginada<Orcamento>;
    orcamento?: Orcamento;
    filtro: FiltroOrcamento;
    search: boolean;
    editarTabPrev: number;
    editarTabAct: number;
}

const unloadedState: OrcamentoState = {
    isLoading: false,
    filtro: {
        codigo: '',
        nome: '',
        descricao: '',
        dataAtualizacaoFinal: null,
        dataAtualizacaoInicial: null,
        dataCriacaoFinal: null,
        dataCriacaoInicial: null,
    },
    search: false,
    editarTabPrev: 0,
    editarTabAct: 0,
};

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
                search: false,
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
        case 'FILTAR_ORCAMENTO':
            return {
                ...state,
                filtro: action.filtro,
                search: true,
            }
        case 'SET_TAB_ORCAMENTO':
            return {
                ...state,
                editarTabPrev: action.prevTab,
                editarTabAct: action.actTab,
            }
        case 'SET_SEARCH_ORCAMENTO':
            return {
                ...state,
                search: action.value
            }
        default:
            return state;
    }
};
