using MediatR;

namespace CalculadorOrcamento.Application.OrcamentoItensAplicacao.Commands.Excluir
{
    public class ExcluirOrcamentoItemAplicacaoCommand : IRequest
    {
        public int Id { get; set; }
    }
}
