using FluentValidation;

namespace CalculadorOrcamento.Application.Usuarios.Commands.Autenticar
{
    public class AutenticarUsuarioCommandValidator : AbstractValidator<AutenticarUsuarioCommand>
    {
        public AutenticarUsuarioCommandValidator()
        {
            RuleFor(e => e.Login)
                .NotEmpty();

            RuleFor(e => e.Senha)
                .NotEmpty();
        }
    }
}
