using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CalculadorOrcamento.Application.Interfaces.BaseApplications;
using CalculadorOrcamento.Application.OrcamentoValores.Models;
using CalculadorOrcamento.Domain.Seeds;
using CalculadorOrcamento.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CalculadorOrcamento.Application.OrcamentoValores.Queries.Search
{
    public class SearchOrcamentoValorQueryHandler : IRequestHandler<SearchOrcamentoValorQuery, List<OrcamentoValorViewModel>>
    {
        private readonly CalculadorOrcamentoContext _context;
        private readonly IMapper _mapper;
        private readonly IOrcamentoAuthBaseApplication _orcamentoAuthBaseApplication;

        public SearchOrcamentoValorQueryHandler(CalculadorOrcamentoContext context, IMapper mapper, IOrcamentoAuthBaseApplication orcamentoAuthBaseApplication)
        {
            _context = context;
            _mapper = mapper;
            _orcamentoAuthBaseApplication = orcamentoAuthBaseApplication;
        }

        public async Task<List<OrcamentoValorViewModel>> Handle(SearchOrcamentoValorQuery request, CancellationToken cancellationToken)
        {
            await _orcamentoAuthBaseApplication.VerificarPermissao(request.IdOrcamento, OrcamentoPermissaoEnum.VISUALIZAR);

            var query = _context.OrcamentoValores.Where(e => e.IdOrcamento == request.IdOrcamento);

            var data = await query.ToListAsync();

            return _mapper.Map<List<OrcamentoValorViewModel>>(data);
        }
    }
}
