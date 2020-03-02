using CalculadorOrcamento.Application.OrcamentoItensAplicacao.Models;
using MediatR;

namespace CalculadorOrcamento.Application.OrcamentoItensAplicacao.Commands.Adicionar
{
    public class AdicionarOrcamentoItemAplicacao
    {
        public int IdOrcamento { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public string Observacao { get; set; }
        public decimal? DuracaoFront { get; set; }
        public decimal? DuracaoBack { get; set; }
        public decimal? DuracaoTotal { get; set; }

    }

    public class AdicionarOrcamentoItemAplicacaoCommand : IRequest<OrcamentoItemAplicacaoViewModel>
    {
        public int IdOrcamento { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public string Observacao { get; set; }
        public decimal? DuracaoFront { get; set; }
        public decimal? DuracaoBack { get; set; }
        public decimal? DuracaoTotal { get; set; }

    }
}
