using MediatR;

namespace CalculadorOrcamento.Application.OrcamentoValores.Commands.Excluir
{
    public class ExcluirOrcamentoValorCommand : IRequest
    {
        public int Id { get; set; }
    }
}
