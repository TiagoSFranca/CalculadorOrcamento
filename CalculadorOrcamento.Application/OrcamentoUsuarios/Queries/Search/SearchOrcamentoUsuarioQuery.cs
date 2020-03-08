using CalculadorOrcamento.Application.OrcamentoUsuarios.Models;
using MediatR;
using System.Collections.Generic;

namespace CalculadorOrcamento.Application.OrcamentoUsuarios.Queries.Search
{
    public class SearchOrcamentoUsuarioQuery : IRequest<List<OrcamentoUsuarioViewModel>>
    {
        public int IdOrcamento { get; set; }
    }
}
