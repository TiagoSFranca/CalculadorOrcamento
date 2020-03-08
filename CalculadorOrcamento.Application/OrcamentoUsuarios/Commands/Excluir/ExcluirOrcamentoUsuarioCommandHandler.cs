using CalculadorOrcamento.Application.Exceptions;
using CalculadorOrcamento.Application.Interfaces.BaseApplications;
using CalculadorOrcamento.Domain.Seeds;
using CalculadorOrcamento.Persistence;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace CalculadorOrcamento.Application.OrcamentoUsuarios.Commands.Excluir
{
    public class ExcluirOrcamentoUsuarioCommandHandler : IRequestHandler<ExcluirOrcamentoUsuarioCommand, Unit>
    {
        private readonly CalculadorOrcamentoContext _context;
        private readonly IOrcamentoAuthBaseApplication _orcamentoAuthBaseApplication;

        public ExcluirOrcamentoUsuarioCommandHandler(CalculadorOrcamentoContext context, IOrcamentoAuthBaseApplication orcamentoAuthBaseApplication)
        {
            _context = context;
            _orcamentoAuthBaseApplication = orcamentoAuthBaseApplication;
        }

        public async Task<Unit> Handle(ExcluirOrcamentoUsuarioCommand request, CancellationToken cancellationToken)
        {
            var entidade = await _context.OrcamentoUsuarios.FindAsync(request.Id);

            if (entidade == null)
                throw new NotFoundException("Orçamento Usuario", request.Id);

            await _orcamentoAuthBaseApplication.VerificarPermissao(entidade.IdOrcamento, OrcamentoPermissaoEnum.ADMIN);

            try
            {
                _context.OrcamentoUsuarios.Remove(entidade);

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
