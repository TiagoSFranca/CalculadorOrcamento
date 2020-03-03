using CalculadorOrcamento.Application.Usuarios.Models;
using System.Threading.Tasks;

namespace CalculadorOrcamento.Application.Interfaces.BaseApplications
{
    public interface IRefreshTokenBaseApplication
    {
        Task SaveRefreshToken(RefreshTokenViewModel model);
    }
}
