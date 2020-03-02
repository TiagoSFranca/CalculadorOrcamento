using FluentValidation;

namespace CalculadorOrcamento.Application.OrcamentoValores.Commands.Editar
{
    public class EditarOrcamentoValorCommandValidator : AbstractValidator<EditarOrcamentoValorCommand>
    {
        public EditarOrcamentoValorCommandValidator()
        {
            RuleFor(e => e.Id)
                .GreaterThan(0);

            RuleFor(e => e.IdOrcamento)
                .GreaterThan(0);

            RuleFor(e => e.Multiplicador)
                .GreaterThanOrEqualTo(0);

            RuleFor(e => e.ValorHora)
                .GreaterThanOrEqualTo(0);
        }
    }
}
