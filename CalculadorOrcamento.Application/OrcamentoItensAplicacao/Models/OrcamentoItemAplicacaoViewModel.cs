using CalculadorOrcamento.Application.Orcamentos.Models;
using System;

namespace CalculadorOrcamento.Application.OrcamentoItensAplicacao.Models
{
    public class OrcamentoItemAplicacaoViewModel
    {
        public int Id { get; set; }
        public int IdOrcamento { get; set; }

        public string Nome { get; set; }
        public string Descricao { get; set; }
        public string Observacao { get; set; }
        public DateTime DataCriacao { get; set; }
        public DateTime DataAtualizacao { get; set; }

        public decimal? DuracaoFront { get; set; }
        public decimal? DuracaoBack { get; set; }
        public decimal? DuracaoTotal { get; set; }

        public OrcamentoViewModel Orcamento { get; set; }
    }
}
