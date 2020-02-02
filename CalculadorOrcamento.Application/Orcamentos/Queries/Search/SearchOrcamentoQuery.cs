using CalculadorOrcamento.Application.Orcamentos.Models;
using CalculadorOrcamento.Application.Paginacoes.Models;
using MediatR;

namespace CalculadorOrcamento.Application.Orcamentos.Queries.Search
{
    public class SearchOrcamentoQuery : IRequest<ConsultaPaginadaViewModel<OrcamentoViewModel>>
    {
        public PaginacaoViewModel Paginacao { get; set; }
    }
}
