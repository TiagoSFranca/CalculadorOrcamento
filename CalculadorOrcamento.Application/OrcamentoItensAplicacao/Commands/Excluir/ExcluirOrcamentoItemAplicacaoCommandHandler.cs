using System;
using System.Threading;
using System.Threading.Tasks;
using CalculadorOrcamento.Application.Exceptions;
using CalculadorOrcamento.Application.Interfaces.BaseApplications;
using CalculadorOrcamento.Domain.Seeds;
using CalculadorOrcamento.Persistence;
using MediatR;

namespace CalculadorOrcamento.Application.OrcamentoItensAplicacao.Commands.Excluir
{
    public class ExcluirOrcamentoItemAplicacaoCommandHandler : IRequestHandler<ExcluirOrcamentoItemAplicacaoCommand>
    {
        private readonly CalculadorOrcamentoContext _context;
        private readonly IOrcamentoAuthBaseApplication _orcamentoAuthBaseApplication;

        public ExcluirOrcamentoItemAplicacaoCommandHandler(CalculadorOrcamentoContext context, IOrcamentoAuthBaseApplication orcamentoAuthBaseApplication)
        {
            _context = context;
            _orcamentoAuthBaseApplication = orcamentoAuthBaseApplication;
        }

        public async Task<Unit> Handle(ExcluirOrcamentoItemAplicacaoCommand request, CancellationToken cancellationToken)
        {
            var entidade = await _context.OrcamentoItemAplicacoes.FindAsync(request.Id);

            if (entidade == null)
                throw new NotFoundException("Item", request.Id);

            await _orcamentoAuthBaseApplication.VerificarPermissao(entidade.IdOrcamento, OrcamentoPermissaoEnum.EXCLUIR);

            try
            {
                _context.OrcamentoItemAplicacoes.Remove(entidade);

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
