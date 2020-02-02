using CalculadorOrcamento.Application.Interfaces.BaseApplications;
using CalculadorOrcamento.Application.Orcamentos.Models;
using CalculadorOrcamento.Application.Paginacoes.Models;
using CalculadorOrcamento.Domain.Entities;
using CalculadorOrcamento.Persistence;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace CalculadorOrcamento.Application.Orcamentos.Queries.Search
{
    public class SearchOrcamentoQueryHandler : IRequestHandler<SearchOrcamentoQuery, ConsultaPaginadaViewModel<OrcamentoViewModel>>
    {
        private readonly CalculadorOrcamentoContext _context;
        private readonly IPaginacaoBaseApplication<Orcamento, OrcamentoViewModel> _paginacaoBaseApplication;

        public SearchOrcamentoQueryHandler(CalculadorOrcamentoContext context, IPaginacaoBaseApplication<Orcamento, OrcamentoViewModel> paginacaoBaseApplication)
        {
            _context = context;
            _paginacaoBaseApplication = paginacaoBaseApplication;
        }

        public async Task<ConsultaPaginadaViewModel<OrcamentoViewModel>> Handle(SearchOrcamentoQuery request, CancellationToken cancellationToken)
        {
            var query = _context.Orcamentos.AsQueryable();

            var paginacao = request.Paginacao ?? new PaginacaoViewModel();

            var retorno = await _paginacaoBaseApplication.Paginar(query, paginacao);

            return retorno;
        }
    }
}
