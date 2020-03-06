using System.Collections.Generic;

namespace CalculadorOrcamento.Domain.Entities
{
    public class OrcamentoPermissao
    {
        public OrcamentoPermissao()
        {
            OrcamentoUsuarioPermissoes = new HashSet<OrcamentoUsuarioPermissao>();
        }

        public int Id { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }

        public virtual ICollection<OrcamentoUsuarioPermissao> OrcamentoUsuarioPermissoes { get; set; }
    }
}
