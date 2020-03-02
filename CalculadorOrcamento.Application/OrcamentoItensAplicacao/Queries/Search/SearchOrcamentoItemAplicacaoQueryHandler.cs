using AutoMapper;
using CalculadorOrcamento.Application.OrcamentoItensAplicacao.Models;
using CalculadorOrcamento.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace CalculadorOrcamento.Application.OrcamentoItensAplicacao.Queries.Search
{
    public class SearchOrcamentoItemAplicacaoQueryHandler : IRequestHandler<SearchOrcamentoItemAplicacaoQuery, List<OrcamentoItemAplicacaoViewModel>>
    {
        private readonly CalculadorOrcamentoContext _context;
        private readonly IMapper _mapper;

        public SearchOrcamentoItemAplicacaoQueryHandler(CalculadorOrcamentoContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<OrcamentoItemAplicacaoViewModel>> Handle(SearchOrcamentoItemAplicacaoQuery request, CancellationToken cancellationToken)
        {
            var query = _context.OrcamentoItemAplicacoes.Where(e => e.IdOrcamento == request.IdOrcamento);

            var data = await query.ToListAsync();

            return _mapper.Map<List<OrcamentoItemAplicacaoViewModel>>(data);
        }
    }
}
