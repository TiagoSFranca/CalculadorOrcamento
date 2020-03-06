using CalculadorOrcamento.Domain.Entities.GenericModels;

namespace CalculadorOrcamento.Domain.Entities
{
    public class OrcamentoUsuarioPermissao : RegistroTempo
    {
        public int Id { get; set; }
        public int IdOrcamento { get; set; }
        public int IdUsuario { get; set; }
        public int IdPermissao { get; set; }

        public virtual Orcamento Orcamento { get; set; }
        public virtual Usuario Usuario { get; set; }
        public virtual OrcamentoPermissao Permissao { get; set; }
    }
}
