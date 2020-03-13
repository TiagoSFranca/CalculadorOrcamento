import { OrcamentoValor } from "./models";

export interface ReceiveOrcamentoItensAction {
    type: 'RECEIVE_ORCAMENTO_VALORES';
    orcamentoValores: OrcamentoValor[];
}

export interface AdicionarOrcamentoItemAction {
    type: 'ADICIONAR_ORCAMENTO_VALOR';
    orcamentoValor?: OrcamentoValor;
}

export interface SetSearchOrcamentoItem {
    type: 'SET_SEARCH_ORCAMENTO_VALOR';
    value: boolean;
}
