using CalculadorOrcamento.Application.OrcamentoItensAplicacao.Models;
using MediatR;

namespace CalculadorOrcamento.Application.OrcamentoItensAplicacao.Commands.Editar
{
    public class EditarOrcamentoItemAplicacao
    {
        public int Id { get; set; }
        public int IdOrcamento { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public string Observacao { get; set; }
        public decimal? DuracaoFront { get; set; }
        public decimal? DuracaoBack { get; set; }
        public decimal? DuracaoTotal { get; set; }
    }

    public class EditarOrcamentoItemAplicacaoCommand : IRequest<OrcamentoItemAplicacaoViewModel>
    {
        public int Id { get; set; }
        public int IdOrcamento { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public string Observacao { get; set; }
        public decimal? DuracaoFront { get; set; }
        public decimal? DuracaoBack { get; set; }
        public decimal? DuracaoTotal { get; set; }
    }
}
