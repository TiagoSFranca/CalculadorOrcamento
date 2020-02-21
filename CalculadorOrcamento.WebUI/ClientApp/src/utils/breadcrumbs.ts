
export interface BreadcrumbItem {
    name: string;
    to: string;
}

export const OrcamentoIndexBreadcrumb: BreadcrumbItem = {
    name: "Orçamentos",
    to: '/orcamento',
}

export const OrcamentoAdicionarBreadcrumb: BreadcrumbItem = {
    name: "Adicionar",
    to: `${OrcamentoIndexBreadcrumb.to}/adicionar`
}