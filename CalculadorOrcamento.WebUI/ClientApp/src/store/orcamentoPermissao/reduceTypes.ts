import { OrcamentoPermissao } from "./models";

export interface ReceiveOrcamentoPermissoesAction {
    type: 'RECEIVE_ORCAMENTO_PERMISSOES';
    orcamentoPermissoes: OrcamentoPermissao[];
}

export interface IsLoadingOrcamentoPermissaoAction {
    type: 'IS_LOADING_ORCAMENTO_PERMISSAO';
    value: boolean;
}

export interface SetSearchOrcamentoPermissao {
    type: 'SET_SEARCH_ORCAMENTO_PERMISSAO';
    value: boolean;
}