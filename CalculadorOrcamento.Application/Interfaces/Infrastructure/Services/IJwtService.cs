using CalculadorOrcamento.Application.Usuarios.Models;

namespace CalculadorOrcamento.Application.Interfaces.Infrastructure.Services
{
    public interface IJwtService
    {
        JsonWebToken CreateToken(UsuarioViewModel usuario);
    }
}
