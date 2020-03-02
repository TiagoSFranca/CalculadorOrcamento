using CalculadorOrcamento.Application.GenericModels;
using System;

namespace CalculadorOrcamento.Application.Orcamentos.Models
{
    public class OrcamentoViewModel : RegistroTempoViewModel
    {
        public int Id { get; set; }
        public Guid Codigo { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }
    }
}
