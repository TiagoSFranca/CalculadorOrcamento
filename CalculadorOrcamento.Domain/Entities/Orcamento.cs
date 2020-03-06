using CalculadorOrcamento.Domain.Entities.GenericModels;
using System;
using System.Collections.Generic;

namespace CalculadorOrcamento.Domain.Entities
{
    public class Orcamento : RegistroTempo
    {
        public Orcamento()
        {
            OrcamentoItemAplicacoes = new HashSet<OrcamentoItemAplicacao>();
            OrcamentoValores = new HashSet<OrcamentoValor>();
            OrcamentoUsuarioPermissoes = new HashSet<OrcamentoUsuarioPermissao>();
        }

        public int Id { get; set; }
        public int IdUsuario { get; set; }
        public Guid Codigo { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }

        public virtual Usuario Usuario { get; set; }

        public virtual ICollection<OrcamentoItemAplicacao> OrcamentoItemAplicacoes { get; set; }
        public virtual ICollection<OrcamentoValor> OrcamentoValores { get; set; }
        public virtual ICollection<OrcamentoUsuarioPermissao> OrcamentoUsuarioPermissoes { get; set; }
    }
}
