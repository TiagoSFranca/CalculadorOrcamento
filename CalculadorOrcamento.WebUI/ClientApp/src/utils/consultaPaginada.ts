
export default interface ConsultaPaginada<Model> {
    pagina: number;
    itensPorPagina: number;
    totalItens: number;
    totalPaginas: number;
    itens: Model[]
}