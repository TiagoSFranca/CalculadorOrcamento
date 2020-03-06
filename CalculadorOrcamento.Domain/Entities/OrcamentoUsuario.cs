using System;
using System.Collections.Generic;
using System.Text;

namespace CalculadorOrcamento.Domain.Entities
{
    public class OrcamentoUsuario
    {
        public int Id { get; set; }
        public int IdOrcamento { get; set; }
        public int IdUsuario { get; set; }

        public virtual Orcamento Orcamento { get; set; }
        public virtual Usuario Usuario { get; set; }
    }
}
