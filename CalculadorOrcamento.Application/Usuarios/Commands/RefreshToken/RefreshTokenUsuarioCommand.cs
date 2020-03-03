using CalculadorOrcamento.Application.Usuarios.Models;
using MediatR;

namespace CalculadorOrcamento.Application.Usuarios.Commands.RefreshToken
{
    public class RefreshTokenUsuario
    {
        public string Token { get; set; }
    }

    public class RefreshTokenUsuarioCommand : IRequest<UsuarioAutenticadoViewModel>
    {
        public string Token { get; set; }
    }
}
