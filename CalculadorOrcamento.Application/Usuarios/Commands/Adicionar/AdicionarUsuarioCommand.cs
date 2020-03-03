using CalculadorOrcamento.Application.Usuarios.Models;
using MediatR;

namespace CalculadorOrcamento.Application.Usuarios.Commands.Adicionar
{
    public class AdicionarUsuario
    {
        public string Nome { get; set; }
        public string Sobrenome { get; set; }
        public string Email { get; set; }
        public string Login { get; set; }
        public string Senha { get; set; }
        public string ConfirmarSenha { get; set; }
    }

    public class AdicionarUsuarioCommand : IRequest<UsuarioViewModel>
    {
        public string Nome { get; set; }
        public string Sobrenome { get; set; }
        public string Email { get; set; }
        public string Login { get; set; }
        public string Senha { get; set; }
        public string ConfirmarSenha { get; set; }
    }
}
