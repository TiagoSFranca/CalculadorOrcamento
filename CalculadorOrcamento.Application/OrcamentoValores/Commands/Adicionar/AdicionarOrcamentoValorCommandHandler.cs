﻿using AutoMapper;
using CalculadorOrcamento.Application.Exceptions;
using CalculadorOrcamento.Application.OrcamentoValores.Models;
using CalculadorOrcamento.Domain.Entities;
using CalculadorOrcamento.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace CalculadorOrcamento.Application.OrcamentoValores.Commands.Adicionar
{
    public class AdicionarOrcamentoValorCommandHandler : IRequestHandler<AdicionarOrcamentoValorCommand, OrcamentoValorViewModel>
    {
        private readonly CalculadorOrcamentoContext _context;
        private readonly IMapper _mapper;

        public AdicionarOrcamentoValorCommandHandler(CalculadorOrcamentoContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<OrcamentoValorViewModel> Handle(AdicionarOrcamentoValorCommand request, CancellationToken cancellationToken)
        {
            var existeOrcamento = await _context.Orcamentos.AnyAsync(e => e.Id == request.IdOrcamento);
            if (!existeOrcamento)
                throw new NotFoundException(nameof(Orcamento), request.IdOrcamento);

            var existe = await _context.OrcamentoValores.AnyAsync(e => e.IdOrcamento == request.IdOrcamento && e.ValorHora == request.ValorHora && e.Multiplicador == request.Multiplicador);
            if (existe)
                throw new BusinessException(string.Format("Valor já cadastrado com esse valor hora [{0}] e multiplicador [{1}]", request.ValorHora, request.Multiplicador));

            var entity = _mapper.Map<OrcamentoValor>(request);

            try
            {
                _context.OrcamentoValores.Add(entity);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new PersistenceException(ex);
            }

            return _mapper.Map<OrcamentoValorViewModel>(entity);
        }
    }
}
