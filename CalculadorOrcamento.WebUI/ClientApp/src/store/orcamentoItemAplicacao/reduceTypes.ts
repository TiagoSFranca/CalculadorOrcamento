import { OrcamentoItemAplicacao } from "./models";

export interface ReceiveOrcamentoItensAction {
    type: 'RECEIVE_ORCAMENTO_ITENS';
    orcamentoItens: OrcamentoItemAplicacao[];
}

export interface AdicionarOrcamentoItemAction {
    type: 'ADICIONAR_ORCAMENTO_ITEM';
    orcamentoItem?: OrcamentoItemAplicacao;
}

export interface IsLoadingOrcamentoItemAction {
    type: 'IS_LOADING_ORCAMENTO_ITEM';
    value: boolean;
}

export interface SetSearchOrcamentoItem {
    type: 'SET_SEARCH_ORCAMENTO_ITEM';
    value: boolean;
}