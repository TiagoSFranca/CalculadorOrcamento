using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using CalculadorOrcamento.Application.Exceptions;
using CalculadorOrcamento.Persistence;
using MediatR;

namespace CalculadorOrcamento.Application.OrcamentoItensAplicacao.Commands.Excluir
{
    public class ExcluirOrcamentoItemAplicacaoCommandHandler : IRequestHandler<ExcluirOrcamentoItemAplicacaoCommand>
    {
        private readonly CalculadorOrcamentoContext _context;

        public ExcluirOrcamentoItemAplicacaoCommandHandler(CalculadorOrcamentoContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(ExcluirOrcamentoItemAplicacaoCommand request, CancellationToken cancellationToken)
        {
            var entidade = await _context.orcamentoItemAplicacoes.FindAsync(request.Id);

            if (entidade == null)
                throw new NotFoundException("Item", request.Id);

            try
            {
                _context.orcamentoItemAplicacoes.Remove(entidade);

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
