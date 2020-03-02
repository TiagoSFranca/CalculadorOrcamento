using CalculadorOrcamento.Application.Exceptions;
using CalculadorOrcamento.Persistence;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace CalculadorOrcamento.Application.OrcamentoValores.Commands.Excluir
{
    public class ExcluirOrcamentoValorCommandHandler : IRequestHandler<ExcluirOrcamentoValorCommand, Unit>
    {
        private readonly CalculadorOrcamentoContext _context;

        public ExcluirOrcamentoValorCommandHandler(CalculadorOrcamentoContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(ExcluirOrcamentoValorCommand request, CancellationToken cancellationToken)
        {
            var entidade = await _context.OrcamentoValores.FindAsync(request.Id);

            if (entidade == null)
                throw new NotFoundException("Valor", request.Id);

            try
            {
                _context.OrcamentoValores.Remove(entidade);

                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new PersistenceException(ex);
            }

            return Unit.Value;
        }
    }
}
