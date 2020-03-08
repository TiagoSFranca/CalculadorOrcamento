using MediatR;

namespace CalculadorOrcamento.Application.OrcamentoUsuarios.Commands.Excluir
{
    public class ExcluirOrcamentoUsuarioCommand : IRequest
    {
        public int Id { get; set; }
    }
}
