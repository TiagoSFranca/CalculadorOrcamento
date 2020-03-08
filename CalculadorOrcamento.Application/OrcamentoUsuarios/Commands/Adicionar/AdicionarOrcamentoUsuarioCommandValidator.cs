using FluentValidation;

namespace CalculadorOrcamento.Application.OrcamentoUsuarios.Commands.Adicionar
{
    public class AdicionarOrcamentoUsuarioCommandValidator : AbstractValidator<AdicionarOrcamentoUsuarioCommand>
    {
        public AdicionarOrcamentoUsuarioCommandValidator()
        {
            RuleFor(e => e.IdOrcamento)
                .GreaterThan(0);

            RuleFor(e => e.IdUsuario)
                .GreaterThan(0);

            RuleFor(e => e.Permissoes)
                .NotEmpty()
                .ForEach(e => e.GreaterThan(0));
        }
    }
}
