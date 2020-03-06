using System;
using System.Threading;
using System.Threading.Tasks;
using CalculadorOrcamento.Application.Exceptions;
using CalculadorOrcamento.Application.Interfaces.BaseApplications;
using CalculadorOrcamento.Domain.Seeds;
using CalculadorOrcamento.Persistence;
using MediatR;

namespace CalculadorOrcamento.Application.OrcamentoValores.Commands.Excluir
{
    public class ExcluirOrcamentoValorCommandHandler : IRequestHandler<ExcluirOrcamentoValorCommand, Unit>
    {
        private readonly CalculadorOrcamentoContext _context;
        private readonly IOrcamentoAuthBaseApplication _orcamentoAuthBaseApplication;

        public ExcluirOrcamentoValorCommandHandler(CalculadorOrcamentoContext context, IOrcamentoAuthBaseApplication orcamentoAuthBaseApplication)
        {
            _context = context;
            _orcamentoAuthBaseApplication = orcamentoAuthBaseApplication;
        }

        public async Task<Unit> Handle(ExcluirOrcamentoValorCommand request, CancellationToken cancellationToken)
        {
            var entidade = await _context.OrcamentoValores.FindAsync(request.Id);

            if (entidade == null)
                throw new NotFoundException("Valor", request.Id);

            await _orcamentoAuthBaseApplication.VerificarPermissao(entidade.IdOrcamento, OrcamentoPermissaoEnum.EXCLUIR);

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
