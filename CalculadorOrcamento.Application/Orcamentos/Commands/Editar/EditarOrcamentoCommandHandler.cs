using AutoMapper;
using CalculadorOrcamento.Application.Exceptions;
using CalculadorOrcamento.Application.Orcamentos.Models;
using CalculadorOrcamento.Domain.Entities;
using CalculadorOrcamento.Persistence;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace CalculadorOrcamento.Application.Orcamentos.Commands.Editar
{
    public class EditarOrcamentoCommandHandler : IRequestHandler<EditarOrcamentoCommand, OrcamentoViewModel>
    {
        private readonly CalculadorOrcamentoContext _context;
        private readonly IMapper _mapper;

        public EditarOrcamentoCommandHandler(CalculadorOrcamentoContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<OrcamentoViewModel> Handle(EditarOrcamentoCommand request, CancellationToken cancellationToken)
        {
            var entidade = await _context.Orcamentos.FindAsync(request.Id);

            if (entidade == null)
                throw new NotFoundException(nameof(Orcamento), request.Id);

            try
            {
                _mapper.Map(request, entidade);

                _context.Orcamentos.Update(entidade);

                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new PersistenceException(ex);
            }

            return _mapper.Map<OrcamentoViewModel>(entidade);
        }
    }
}
