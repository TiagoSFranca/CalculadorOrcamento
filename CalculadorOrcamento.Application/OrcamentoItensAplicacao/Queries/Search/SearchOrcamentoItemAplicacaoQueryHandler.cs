﻿using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CalculadorOrcamento.Application.Interfaces.BaseApplications;
using CalculadorOrcamento.Application.OrcamentoItensAplicacao.Models;
using CalculadorOrcamento.Domain.Seeds;
using CalculadorOrcamento.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CalculadorOrcamento.Application.OrcamentoItensAplicacao.Queries.Search
{
    public class SearchOrcamentoItemAplicacaoQueryHandler : IRequestHandler<SearchOrcamentoItemAplicacaoQuery, List<OrcamentoItemAplicacaoViewModel>>
    {
        private readonly CalculadorOrcamentoContext _context;
        private readonly IMapper _mapper;
        private readonly IOrcamentoAuthBaseApplication _orcamentoAuthBaseApplication;

        public SearchOrcamentoItemAplicacaoQueryHandler(CalculadorOrcamentoContext context, IMapper mapper, IOrcamentoAuthBaseApplication orcamentoAuthBaseApplication)
        {
            _context = context;
            _mapper = mapper;
            _orcamentoAuthBaseApplication = orcamentoAuthBaseApplication;
        }

        public async Task<List<OrcamentoItemAplicacaoViewModel>> Handle(SearchOrcamentoItemAplicacaoQuery request, CancellationToken cancellationToken)
        {
            await _orcamentoAuthBaseApplication.VerificarPermissao(request.IdOrcamento, OrcamentoPermissaoEnum.VISUALIZAR);

            var query = _context.OrcamentoItemAplicacoes.Where(e => e.IdOrcamento == request.IdOrcamento);

            var data = await query.ToListAsync();

            return _mapper.Map<List<OrcamentoItemAplicacaoViewModel>>(data);
        }
    }
}
