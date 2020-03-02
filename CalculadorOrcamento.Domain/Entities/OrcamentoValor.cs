using CalculadorOrcamento.Domain.Entities.GenericModels;

namespace CalculadorOrcamento.Domain.Entities
{
    public class OrcamentoValor : RegistroTempo
    {
        public int Id { get; set; }
        public int IdOrcamento { get; set; }
        public decimal ValorHora { get; set; }
        public decimal Multiplicador { get; set; }

        public virtual Orcamento Orcamento { get; set; }
    }
}
