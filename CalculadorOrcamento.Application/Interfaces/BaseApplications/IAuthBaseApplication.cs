using CalculadorOrcamento.Domain.Entities;
using System.Threading.Tasks;

namespace CalculadorOrcamento.Application.Interfaces.BaseApplications
{
    public interface IAuthBaseApplication
    {
        Task<Usuario> GetUsuarioLogado();
        int GetId();
    }
}
