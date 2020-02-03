
export interface ConsultaPaginada<Model> {
    pagina: number;
    itensPorPagina: number;
    totalItens: number;
    totalPaginas: number;
    itens: Model[]
}

export interface QtdPorPagina {
    qtd: number;
    descricao: string;
}

export const QtdPadrao: QtdPorPagina = {
    qtd: 10,
    descricao: "10 Itens"
}

export const QtdMedia: QtdPorPagina = {
    qtd: 20,
    descricao: "20 Itens"
}

export const QtdBastante: QtdPorPagina = {
    qtd: 30,
    descricao: "30 Itens"
}

export const Quantidades: QtdPorPagina[] = [
    QtdPadrao,
    QtdMedia,
    QtdBastante
]


