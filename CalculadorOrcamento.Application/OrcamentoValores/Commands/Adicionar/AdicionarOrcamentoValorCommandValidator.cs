using FluentValidation;

namespace CalculadorOrcamento.Application.OrcamentoValores.Commands.Adicionar
{
    public class AdicionarOrcamentoValorCommandValidator : AbstractValidator<AdicionarOrcamentoValorCommand>
    {
        public AdicionarOrcamentoValorCommandValidator()
        {
            RuleFor(e => e.IdOrcamento)
                .GreaterThan(0);

            RuleFor(e => e.Multiplicador)
                .GreaterThanOrEqualTo(0);

            RuleFor(e => e.ValorHora)
                .GreaterThanOrEqualTo(0);
        }
    }
}
