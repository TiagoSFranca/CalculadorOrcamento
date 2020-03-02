using CalculadorOrcamento.Application.OrcamentoValores.Models;
using MediatR;
using System.Collections.Generic;

namespace CalculadorOrcamento.Application.OrcamentoValores.Queries.Search
{
    public class SearchOrcamentoValorQuery : IRequest<List<OrcamentoValorViewModel>>
    {
        public int IdOrcamento { get; set; }
    }
}
