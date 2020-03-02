using AutoMapper;
using CalculadorOrcamento.Application.Exceptions;
using CalculadorOrcamento.Application.Orcamentos.Models;
using CalculadorOrcamento.Domain.Entities;
using CalculadorOrcamento.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace CalculadorOrcamento.Application.Orcamentos.Commands.Adicionar
{
    public class AdicionarOrcamentoCommandHandler : IRequestHandler<AdicionarOrcamentoCommand, OrcamentoViewModel>
    {
        private readonly IMapper _mapper;
        private readonly CalculadorOrcamentoContext _context;

        public AdicionarOrcamentoCommandHandler(IMapper mapper, CalculadorOrcamentoContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<OrcamentoViewModel> Handle(AdicionarOrcamentoCommand request, CancellationToken cancellationToken)
        {
            var existe = await _context.Orcamentos.AnyAsync(e => e.Nome.ToLower().Equals(request.Nome.ToLower()));
            if (existe)
                throw new BusinessException(string.Format("Orçamento já cadastrado com esse nome [{0}]", request.Nome));

            var entity = _mapper.Map<Orcamento>(request);

            try
            {
                entity.Codigo = Guid.NewGuid();

                _context.Orcamentos.Add(entity);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new PersistenceException(ex);
            }

            return _mapper.Map<OrcamentoViewModel>(entity);
        }
    }
}
