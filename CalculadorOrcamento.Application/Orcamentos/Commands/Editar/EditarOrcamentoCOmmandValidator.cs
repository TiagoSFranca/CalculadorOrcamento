using FluentValidation;

namespace CalculadorOrcamento.Application.Orcamentos.Commands.Editar
{
    public class EditarOrcamentoCommandValidator : AbstractValidator<EditarOrcamentoCommand>
    {
        public EditarOrcamentoCommandValidator()
        {
            RuleFor(e => e.Id)
                .GreaterThan(0);

            RuleFor(e => e.Nome)
                .NotEmpty()
                .MaximumLength(128);

            RuleFor(e => e.Descricao)
                .MaximumLength(512);
        }
    }
}
