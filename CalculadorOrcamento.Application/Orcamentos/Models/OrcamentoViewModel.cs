using System;

namespace CalculadorOrcamento.Application.Orcamentos.Models
{
    public class OrcamentoViewModel
    {
        public int Id { get; set; }
        public Guid Codigo { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public DateTime DataCriacao { get; set; }
        public DateTime DataAtualizacao { get; set; }
    }
}
