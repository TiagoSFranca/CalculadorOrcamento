using System.Threading.Tasks;
using CalculadorOrcamento.Domain.Seeds;

namespace CalculadorOrcamento.Application.Interfaces.BaseApplications
{
    public interface IOrcamentoAuthBaseApplication
    {
        Task VerificarPermissao(int idOrcamento, OrcamentoPermissaoEnum idPermissao);
    }
}
