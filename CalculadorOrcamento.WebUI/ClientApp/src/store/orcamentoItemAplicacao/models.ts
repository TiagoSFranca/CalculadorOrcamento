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
    idOrcamento: number;
    nome: string;
    descricao?: string;
    observavao?: string;
    duracaoBack?: number;
    duracaoFront?: number;
    duracaoTotal?: number;
}

export interface EditarOrcamentoItemAplicacao {
    id: number;
    idOrcamento: number;
    nome: string;
    descricao?: string;
    observavao?: string;
    duracaoBack?: number;
    duracaoFront?: number;
    duracaoTotal?: number;
}