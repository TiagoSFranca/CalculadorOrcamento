using CalculadorOrcamento.Application.Usuarios.Models;

namespace CalculadorOrcamento.Application.Interfaces.Infrastructure.Services
{
    public interface IJwtService
    {
        JsonWebTokenViewModel CreateToken(UsuarioViewModel usuario);
    }
}
