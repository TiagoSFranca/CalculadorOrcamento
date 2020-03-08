using AutoMapper;
using CalculadorOrcamento.Application.Interfaces.BaseApplications;
using CalculadorOrcamento.Application.OrcamentoUsuarios.Models;
using CalculadorOrcamento.Domain.Seeds;
using CalculadorOrcamento.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace CalculadorOrcamento.Application.OrcamentoUsuarios.Queries.Search
{
    public class SearchOrcamentoUsuarioQueryHandler : IRequestHandler<SearchOrcamentoUsuarioQuery, List<OrcamentoUsuarioViewModel>>
    {
        private readonly CalculadorOrcamentoContext _context;
        private readonly IMapper _mapper;
        private readonly IOrcamentoAuthBaseApplication _orcamentoAuthBaseApplication;

        public SearchOrcamentoUsuarioQueryHandler(CalculadorOrcamentoContext context, IMapper mapper, IOrcamentoAuthBaseApplication orcamentoAuthBaseApplication)
        {
            _context = context;
            _mapper = mapper;
            _orcamentoAuthBaseApplication = orcamentoAuthBaseApplication;
        }

        public async Task<List<OrcamentoUsuarioViewModel>> Handle(SearchOrcamentoUsuarioQuery request, CancellationToken cancellationToken)
        {
            await _orcamentoAuthBaseApplication.VerificarPermissao(request.IdOrcamento, OrcamentoPermissaoEnum.ADMIN);

            var query = _context.OrcamentoUsuarios
                .Where(e => e.IdOrcamento == request.IdOrcamento);

            var data = await query.ToListAsync();

            return _mapper.Map<List<OrcamentoUsuarioViewModel>>(data);
        }
    }
}
