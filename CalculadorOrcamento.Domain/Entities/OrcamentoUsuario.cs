using System.Collections.Generic;
using CalculadorOrcamento.Domain.Entities.GenericModels;

namespace CalculadorOrcamento.Domain.Entities
{
    public class OrcamentoUsuario : RegistroTempo
    {
        public OrcamentoUsuario()
        {
            OrcamentoUsuarioPermissoes = new HashSet<OrcamentoUsuarioPermissao>();
        }

        public int Id { get; set; }
        public int IdOrcamento { get; set; }
        public int IdUsuario { get; set; }

        public virtual Orcamento Orcamento { get; set; }
        public virtual Usuario Usuario { get; set; }

        public virtual ICollection<OrcamentoUsuarioPermissao> OrcamentoUsuarioPermissoes { get; set; }
    }
}
