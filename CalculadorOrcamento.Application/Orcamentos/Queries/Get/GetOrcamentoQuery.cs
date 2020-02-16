using CalculadorOrcamento.Application.Orcamentos.Models;
using MediatR;

namespace CalculadorOrcamento.Application.Orcamentos.Queries.Get
{
    public class GetOrcamentoQuery : IRequest<OrcamentoViewModel>
    {
        public int Id { get; set; }
    }
}
