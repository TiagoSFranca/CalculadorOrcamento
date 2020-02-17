using System;
using System.Collections.Generic;

namespace CalculadorOrcamento.Domain.Entities
{
    public class Orcamento
    {
        public Orcamento()
        {
            OrcamentoItemAplicacoes = new HashSet<OrcamentoItemAplicacao>();
        }

        public int Id { get; set; }
        public Guid Codigo { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public DateTime DataCriacao { get; set; }
        public DateTime DataAtualizacao { get; set; }

        public virtual ICollection<OrcamentoItemAplicacao> OrcamentoItemAplicacoes { get; set; }
    }
}
