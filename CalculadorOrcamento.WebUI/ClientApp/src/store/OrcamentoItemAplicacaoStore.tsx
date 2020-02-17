import HTTP from 'http/index';
import { Query } from 'material-table';
import { Action, Reducer } from 'redux';
import { ConsultaPaginada, QtdPadrao } from 'utils/consultaPaginada';
import formatter from 'utils/formatter';
import { AppThunkAction } from './';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface OrcamentoItemAplicacaoState {
    isLoading: boolean;
    orcamentos?: ConsultaPaginada<OrcamentoItemAplicacao>;
    orcamento?: OrcamentoItemAplicacao;
    search: boolean;
    editarTabPrev: number;
    editarTabAct: number;
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
    nome: string;
    descricao?: string;
    observavao?: string;
    duracaoBack?: number;
    duracaoFront?: number;
    duracaoTotal?: number;
}

interface ReceiveOrcamentoItensAction {
    type: 'RECEIVE_ORCAMENTOS';
    orcamentos: ConsultaPaginada<OrcamentoItemAplicacao>;
}

interface AdicionarOrcamentoItemAction {
    type: 'ADICIONAR_ORCAMENTO';
    orcamento?: OrcamentoItemAplicacao;
}

interface IsLoadingOrcamentoItemAction {
    type: 'IS_LOADING_ORCAMENTO';
    value: boolean;
}

type KnownAction = ReceiveOrcamentoItensAction | AdicionarOrcamentoItemAction | IsLoadingOrcamentoItemAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestOrcamentos: (callback: Function, query: Query<OrcamentoItemAplicacao>, resolve?: any): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'IS_LOADING_ORCAMENTO', value: true });

        let filtro = getState().orcamento.filtro;
        console.log(filtro);
        let qtdPorPagina = query.pageSize || query.pageSize >= QtdPadrao.qtd ? query.pageSize : QtdPadrao.qtd;
        let pagina = getState().orcamento.search ? 1 : query.page + 1;

        HTTP.get(`/orcamentos?itensPorPagina=${qtdPorPagina}&pagina=${pagina}&asc=${query.orderDirection !== "desc" ? true : false}
&ordenarPor=${encodeURIComponent(query.orderBy && query.orderBy.field ? query.orderBy.field : "")}&codigo=${encodeURIComponent(filtro.codigo)}
&nome=${encodeURIComponent(filtro.nome)}&descricao=${encodeURIComponent(filtro.descricao)}&dataCriacaoInicial=${formatter.formatarDataRequest(filtro.dataCriacaoInicial)}
&dataCriacaoFinal=${formatter.formatarDataRequest(filtro.dataCriacaoFinal)}&dataAtualizacaoInicial=${formatter.formatarDataRequest(filtro.dataAtualizacaoInicial)}&dataAtualizacaoFinal=${formatter.formatarDataRequest(filtro.dataAtualizacaoFinal)}`)
            .then(response => response.data as Promise<ConsultaPaginada<OrcamentoItemAplicacao>>)
            .then(result => {
                dispatch({ type: 'RECEIVE_ORCAMENTOS', orcamentos: result });
                dispatch({ type: 'IS_LOADING_ORCAMENTO', value: false });

                if (resolve) {
                    resolve({
                        data: result.itens,
                        page: result.pagina - 1,
                        totalCount: result.totalItens,
                    })
                }

                callback();
            }, error => {
                callback(error);
                if (resolve)
                    resolve({
                        data: [],
                        page: 0,
                        totalCount: 0,
                    })
                dispatch({ type: 'IS_LOADING_ORCAMENTO', value: false });
            });
    },

    adicionarItem: (data: AdicionarOrcamentoItem, callback: Function): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'IS_LOADING_ORCAMENTO', value: true });

        HTTP.post(`/orcamentoitensaplicacao`, JSON.stringify(data))
            .then(response => response.data as Promise<OrcamentoItemAplicacao>)
            .then(data => {
                dispatch({ type: 'ADICIONAR_ORCAMENTO', orcamento: data });
                dispatch({ type: 'IS_LOADING_ORCAMENTO', value: false });
                callback();
            }, error => {
                callback(error);
                dispatch({ type: 'IS_LOADING_ORCAMENTO', value: false });
            });
    },
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: OrcamentoItemAplicacaoState = {
    isLoading: false,
    search: false,
    editarTabPrev: 0,
    editarTabAct: 0,
};

export const reducer: Reducer<OrcamentoItemAplicacaoState> = (state: OrcamentoItemAplicacaoState | undefined, incomingAction: Action): OrcamentoItemAplicacaoState => {
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
        default:
            return state;
    }
};
