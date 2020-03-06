using System.Linq;
using System.Threading.Tasks;
using CalculadorOrcamento.Application.Exceptions;
using CalculadorOrcamento.Application.Interfaces.BaseApplications;
using CalculadorOrcamento.Domain.Seeds;
using CalculadorOrcamento.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CalculadorOrcamento.Application.BaseApplications
{
    public class OrcamentoAuthBaseApplication : IOrcamentoAuthBaseApplication
    {
        private readonly CalculadorOrcamentoContext _context;
        private readonly IAuthBaseApplication _authBaseApplication;

        public OrcamentoAuthBaseApplication(CalculadorOrcamentoContext context, IAuthBaseApplication authBaseApplication)
        {
            _context = context;
            _authBaseApplication = authBaseApplication;
        }

        public async Task VerificarPermissao(int idOrcamento, OrcamentoPermissaoEnum idPermissao)
        {
            var idUsuario = _authBaseApplication.GetId();

            var orcamento = await _context.Orcamentos.FirstOrDefaultAsync(e => e.Id == idOrcamento);

            //TODO: Adicionar verificação após criar as permissões
            if (orcamento != null)
            {
                if (orcamento.IdUsuario == idUsuario)
                    return;
                var temPermissao = await _context.OrcamentoUsuarioPermissoes
                    .AnyAsync(e => e.IdOrcamento == idOrcamento && e.IdUsuario == idUsuario 
                    && (e.IdPermissao == (int)idPermissao || e.IdPermissao == (int)OrcamentoPermissaoEnum.ADMIN));

                if (!temPermissao)
                    throw new ForbiddenException();
            }
        }
    }
}
