using AutoMapper;
using CalculadorOrcamento.Application.OrcamentoValores.Models;
using CalculadorOrcamento.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace CalculadorOrcamento.Application.OrcamentoValores.Queries.Search
{
    public class SearchOrcamentoValorQueryHandler : IRequestHandler<SearchOrcamentoValorQuery, List<OrcamentoValorViewModel>>
    {
        private readonly CalculadorOrcamentoContext _context;
        private readonly IMapper _mapper;

        public SearchOrcamentoValorQueryHandler(CalculadorOrcamentoContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<OrcamentoValorViewModel>> Handle(SearchOrcamentoValorQuery request, CancellationToken cancellationToken)
        {
            var query = _context.OrcamentoValores.Where(e => e.IdOrcamento == request.IdOrcamento);

            var data = await query.ToListAsync();

            return _mapper.Map<List<OrcamentoValorViewModel>>(data);
        }
    }
}
