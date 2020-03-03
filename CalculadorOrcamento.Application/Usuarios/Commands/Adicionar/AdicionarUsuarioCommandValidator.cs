using FluentValidation;

namespace CalculadorOrcamento.Application.Usuarios.Commands.Adicionar
{
    public class AdicionarUsuarioCommandValidator : AbstractValidator<AdicionarUsuarioCommand>
    {
        public AdicionarUsuarioCommandValidator()
        {
            RuleFor(e => e.Nome)
                .NotEmpty()
                .Length(3, 64);

            RuleFor(e => e.Sobrenome)
                .NotEmpty()
                .MaximumLength(256);

            RuleFor(e => e.Email)
                .EmailAddress()
                .MaximumLength(256);

            RuleFor(e => e.Login)
                .NotEmpty()
                .Length(5, 64)
                .Matches(@"^\S*$");

            RuleFor(e => e.Senha)
                .NotEmpty()
                .Length(6, 64)
                .Equal(e => e.ConfirmarSenha);
        }
    }
}
