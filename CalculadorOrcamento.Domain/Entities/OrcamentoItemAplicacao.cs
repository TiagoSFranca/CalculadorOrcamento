using CalculadorOrcamento.Domain.Entities.GenericModels;

namespace CalculadorOrcamento.Domain.Entities
{
    public class OrcamentoItemAplicacao : RegistroTempo
    {
        public int Id { get; set; }
        public int IdOrcamento { get; set; }

        public string Nome { get; set; }
        public string Descricao { get; set; }
        public string Observacao { get; set; }
        public decimal? DuracaoFront { get; set; }
        public decimal? DuracaoBack { get; set; }
        public decimal? DuracaoTotal { get; set; }

        public virtual Orcamento Orcamento { get; set; }
    }
}
