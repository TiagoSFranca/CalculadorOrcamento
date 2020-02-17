using CalculadorOrcamento.Application.OrcamentoItensAplicacao.Models;
using MediatR;
using System.Collections.Generic;

namespace CalculadorOrcamento.Application.OrcamentoItensAplicacao.Queries.Search
{
    public class SearchOrcamentoItemAplicacaoQuery : IRequest<List<OrcamentoItemAplicacaoViewModel>>
    {
        public int IdOrcamento { get; set; }
    }
}
