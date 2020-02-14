using System.Collections.Generic;
using CalculadorOrcamento.Application.Orcamentos.Models;
using CalculadorOrcamento.Application.Paginacoes.Models;
using MediatR;

namespace CalculadorOrcamento.Application.Orcamentos.Queries.Search
{
    public class SearchOrcamentoQuery : IRequest<ConsultaPaginadaViewModel<OrcamentoViewModel>>
    {
        public string Ordenar { get; set; }
        public bool Asc { get; set; }
        public PaginacaoViewModel Paginacao { get; set; }
        public Dictionary<string, string> Filtros { get; set; }
    }

    public enum OrdenacaoOrcamento
    {
        Id,
        Codigo,
        Nome,
        Descricao,
        DataCriacao,
        DataAtualizacao
    }
}
