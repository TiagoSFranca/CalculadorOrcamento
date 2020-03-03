using CalculadorOrcamento.Application.Usuarios.Models;
using MediatR;

namespace CalculadorOrcamento.Application.Usuarios.Commands.Autenticar
{
    public class AutenticarUsuario
    {
        public string Login { get; set; }
        public string Senha { get; set; }
    }

    public class AutenticarUsuarioCommand : IRequest<UsuarioAutenticadoViewModel>
    {
        public string Login { get; set; }
        public string Senha { get; set; }
    }
}
