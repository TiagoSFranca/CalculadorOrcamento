﻿using AutoMapper;
using CalculadorOrcamento.Application.Exceptions;
using CalculadorOrcamento.Application.Interfaces.BaseApplications;
using CalculadorOrcamento.Application.Orcamentos.Models;
using CalculadorOrcamento.Domain.Entities;
using CalculadorOrcamento.Domain.Seeds;
using CalculadorOrcamento.Persistence;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace CalculadorOrcamento.Application.Orcamentos.Queries.Get
{
    public class GetOrcamentoQueryHandler : IRequestHandler<GetOrcamentoQuery, OrcamentoViewModel>
    {
        private readonly CalculadorOrcamentoContext _context;
        private readonly IOrcamentoAuthBaseApplication _orcamentoAuthBaseApplication;
        private readonly IMapper _mapper;

        public GetOrcamentoQueryHandler(CalculadorOrcamentoContext context, IOrcamentoAuthBaseApplication orcamentoAuthBaseApplication, IMapper mapper)
        {
            _context = context;
            _orcamentoAuthBaseApplication = orcamentoAuthBaseApplication;
            _mapper = mapper;
        }

        public async Task<OrcamentoViewModel> Handle(GetOrcamentoQuery request, CancellationToken cancellationToken)
        {
            await _orcamentoAuthBaseApplication.VerificarPermissao(request.Id, OrcamentoPermissaoEnum.VISUALIZAR);

            var orcamentoData = await _context.Orcamentos.FindAsync(request.Id);

            if (orcamentoData == null)
                throw new NotFoundException(nameof(Orcamento), request.Id);

            var data = _mapper.Map<OrcamentoViewModel>(orcamentoData);

            return data;
        }
    }
}
