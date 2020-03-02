using CalculadorOrcamento.Application.GenericModels;
using System;

namespace CalculadorOrcamento.Application.OrcamentoValores.Models
{
    public class OrcamentoValorViewModel : RegistroTempoViewModel
    {
        public int Id { get; set; }
        public int IdOrcamento { get; set; }
        public decimal ValorHora { get; set; }
        public decimal Multiplicador { get; set; }

    }
}
