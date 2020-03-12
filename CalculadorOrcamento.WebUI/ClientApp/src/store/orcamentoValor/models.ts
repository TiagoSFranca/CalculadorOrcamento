
export interface OrcamentoValor {
    id: number;
    idOrcamento: number;
    valorHora: number;
    multiplicador: number;
}

export interface AdicionarOrcamentoValor {
    idOrcamento: number;
    valorHora: number;
    multiplicador: number;
}

export interface EditarOrcamentoValor {
    id: number;
    idOrcamento: number;
    valorHora: number;
    multiplicador: number;
}
