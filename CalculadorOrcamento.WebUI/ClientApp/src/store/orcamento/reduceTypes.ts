import { ConsultaPaginada } from "utils/consultaPaginada";
import { Orcamento, FiltroOrcamento } from "./models";

export interface ReceiveOrcamentosAction {
    type: 'RECEIVE_ORCAMENTOS';
    orcamentos: ConsultaPaginada<Orcamento>;
}

export interface AdicionarOrcamentoAction {
    type: 'ADICIONAR_ORCAMENTO';
    orcamento?: Orcamento;
}

export interface FiltrarOrcamentoAction {
    type: 'FILTAR_ORCAMENTO';
    filtro: FiltroOrcamento;
}

export interface SelecionarOrcamentoAction {
    type: 'SELECIONAR_ORCAMENTO';
    orcamento?: Orcamento;
}

export interface SetTabAction {
    type: 'SET_TAB_ORCAMENTO';
    prevTab: number;
    actTab: number;
}

export interface SetSearchOrcamento {
    type: 'SET_SEARCH_ORCAMENTO';
    value: boolean;
}
