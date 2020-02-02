using FluentValidation;

namespace CalculadorOrcamento.Application.Orcamentos.Commands.Adicionar
{
    public class AdicionarOrcamentoCommandValidator : AbstractValidator<AdicionarOrcamentoCommand>
    {
        public AdicionarOrcamentoCommandValidator()
        {
            RuleFor(e => e.Nome)
                .NotEmpty()
                .MaximumLength(128);

            RuleFor(e => e.Descricao)
                .MaximumLength(512);
        }
    }
}
