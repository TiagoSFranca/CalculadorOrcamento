using CalculadorOrcamento.Application.Orcamentos.Models;
using CalculadorOrcamento.Application.Paginacoes.Models;
using MediatR;
using System;

namespace CalculadorOrcamento.Application.Orcamentos.Queries.Search
{
    public class SearchOrcamentoQuery : IRequest<ConsultaPaginadaViewModel<OrcamentoViewModel>>
    {
        public string Codigo { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public DateTime? DataCriacaoInicial { get; set; }
        public DateTime? DataCriacaoFinal { get; set; }
        public DateTime? DataAtualizacaoInicial { get; set; }
        public DateTime? DataAtualizacaoFinal { get; set; }

        public string Ordenar { get; set; }
        public bool Asc { get; set; }
        public PaginacaoViewModel Paginacao { get; set; }

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
