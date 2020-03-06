﻿using System;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CalculadorOrcamento.Application.Exceptions;
using CalculadorOrcamento.Application.Interfaces.BaseApplications;
using CalculadorOrcamento.Application.OrcamentoItensAplicacao.Models;
using CalculadorOrcamento.Domain.Entities;
using CalculadorOrcamento.Domain.Seeds;
using CalculadorOrcamento.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CalculadorOrcamento.Application.OrcamentoItensAplicacao.Commands.Adicionar
{
    public class AdicionarOrcamentoItemAplicacaoCommandHandler : IRequestHandler<AdicionarOrcamentoItemAplicacaoCommand, OrcamentoItemAplicacaoViewModel>
    {
        private readonly CalculadorOrcamentoContext _context;
        private readonly IMapper _mapper;
        private readonly IOrcamentoAuthBaseApplication _orcamentoAuthBaseApplication;

        public AdicionarOrcamentoItemAplicacaoCommandHandler(CalculadorOrcamentoContext context, IMapper mapper, IOrcamentoAuthBaseApplication orcamentoAuthBaseApplication)
        {
            _context = context;
            _mapper = mapper;
            _orcamentoAuthBaseApplication = orcamentoAuthBaseApplication;
        }

        public async Task<OrcamentoItemAplicacaoViewModel> Handle(AdicionarOrcamentoItemAplicacaoCommand request, CancellationToken cancellationToken)
        {
            await _orcamentoAuthBaseApplication.VerificarPermissao(request.IdOrcamento, OrcamentoPermissaoEnum.EDITAR);

            var existeOrcamento = await _context.Orcamentos.AnyAsync(e => e.Id == request.IdOrcamento);
            if (!existeOrcamento)
                throw new NotFoundException(nameof(Orcamento), request.IdOrcamento);

            var existe = await _context.OrcamentoItemAplicacoes.AnyAsync(e => e.IdOrcamento == request.IdOrcamento && e.Nome.ToLower().Equals(request.Nome.ToLower()));
            if (existe)
                throw new BusinessException(string.Format("Item já cadastrado com esse nome [{0}]", request.Nome));

            var entity = _mapper.Map<OrcamentoItemAplicacao>(request);

            try
            {
                _context.OrcamentoItemAplicacoes.Add(entity);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new PersistenceException(ex);
            }

            return _mapper.Map<OrcamentoItemAplicacaoViewModel>(entity);
        }
    }
}
