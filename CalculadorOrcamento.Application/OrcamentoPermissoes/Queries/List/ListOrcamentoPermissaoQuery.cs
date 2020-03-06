using System.Collections.Generic;
using CalculadorOrcamento.Application.OrcamentoPermissoes.Models;
using MediatR;

namespace CalculadorOrcamento.Application.OrcamentoPermissoes.Queries.List
{
    public class ListOrcamentoPermissaoQuery : IRequest<List<OrcamentoPermissaoViewModel>>
    {
    }
}
