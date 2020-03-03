using FluentValidation;

namespace CalculadorOrcamento.Application.Usuarios.Commands.RefreshToken
{
    public class RefreshTokenUsuarioCommandValidator : AbstractValidator<RefreshTokenUsuarioCommand>
    {
        public RefreshTokenUsuarioCommandValidator()
        {
            RuleFor(e => e.Token)
                .NotEmpty();
        }
    }
}
