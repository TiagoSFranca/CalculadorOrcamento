export interface Orcamento
{
    id: number;
    codigo: string;
    nome: string;
    descricao: string;
    dataCriacao: string;
    dataAtualizacao: string;
}

export interface AdicionarOrcamento
{
    nome: string;
    descricao?: string;
}

export interface EditarOrcamento
{
    id: number;
    nome: string;
    descricao?: string;
}

export interface FiltroOrcamento
{
    codigo: string;
    nome: string;
    descricao: string;
    dataCriacaoInicial: Date | null;
    dataCriacaoFinal: Date | null;
    dataAtualizacaoInicial: Date | null;
    dataAtualizacaoFinal: Date | null;
};

