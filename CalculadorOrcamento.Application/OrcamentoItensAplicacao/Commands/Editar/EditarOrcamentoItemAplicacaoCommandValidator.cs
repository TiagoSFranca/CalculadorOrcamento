using FluentValidation;

namespace CalculadorOrcamento.Application.OrcamentoItensAplicacao.Commands.Editar
{
    public class EditarOrcamentoItemAplicacaoCommandValidator : AbstractValidator<EditarOrcamentoItemAplicacaoCommand>
    {
        public EditarOrcamentoItemAplicacaoCommandValidator()
        {
            RuleFor(e => e.Id)
                .GreaterThan(0);

            RuleFor(e => e.IdOrcamento)
                .GreaterThan(0);

            RuleFor(e => e.Nome)
                .NotEmpty()
                .MaximumLength(128);

            RuleFor(e => e.Descricao)
                .MaximumLength(512);

            RuleFor(e => e.Observacao)
                .MaximumLength(1024);
        }
    }
}
