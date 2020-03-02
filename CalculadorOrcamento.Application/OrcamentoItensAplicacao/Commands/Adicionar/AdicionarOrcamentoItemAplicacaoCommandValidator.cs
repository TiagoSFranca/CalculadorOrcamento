using FluentValidation;

namespace CalculadorOrcamento.Application.OrcamentoItensAplicacao.Commands.Adicionar
{
    public class AdicionarOrcamentoItemAplicacaoCommandValidator : AbstractValidator<AdicionarOrcamentoItemAplicacaoCommand>
    {
        public AdicionarOrcamentoItemAplicacaoCommandValidator()
        {
            RuleFor(e => e.IdOrcamento)
                .GreaterThan(0);

            RuleFor(e => e.Nome)
                .NotEmpty()
                .MaximumLength(128);

            RuleFor(e => e.Descricao)
                .MaximumLength(512);

            RuleFor(e => e.Observacao)
                .MaximumLength(1024);

            RuleFor(e => e.DuracaoBack)
                .GreaterThanOrEqualTo(0);

            RuleFor(e => e.DuracaoFront)
                .GreaterThanOrEqualTo(0);

            RuleFor(e => e.DuracaoTotal)
                .GreaterThanOrEqualTo(0);
        }
    }
}
