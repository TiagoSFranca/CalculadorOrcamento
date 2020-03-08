using FluentValidation;

namespace CalculadorOrcamento.Application.OrcamentoUsuarios.Commands.Editar
{
    public class EditarOrcamentoUsuarioCommandValidator : AbstractValidator<EditarOrcamentoUsuarioCommand>
    {
        public EditarOrcamentoUsuarioCommandValidator()
        {
            RuleFor(e => e.Id)
                .GreaterThan(0);

            RuleFor(e => e.IdOrcamento)
                .GreaterThan(0);

            RuleFor(e => e.Permissoes)
                .NotEmpty()
                .ForEach(e => e.GreaterThan(0));
        }
    }
}
