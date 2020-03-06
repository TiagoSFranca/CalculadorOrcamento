using CalculadorOrcamento.Domain.Entities.GenericModels;

namespace CalculadorOrcamento.Domain.Entities
{
    public class OrcamentoUsuarioPermissao : RegistroTempo
    {
        public int Id { get; set; }
        public int IdOrcamentoUsuario { get; set; }
        public int IdPermissao { get; set; }
        public bool Permite { get; set; }

        public virtual OrcamentoUsuario OrcamentoUsuario { get; set; }
        public virtual OrcamentoPermissao Permissao { get; set; }
    }
}
