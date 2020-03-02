using CalculadorOrcamento.Application.OrcamentoValores.Models;
using MediatR;

namespace CalculadorOrcamento.Application.OrcamentoValores.Commands.Adicionar
{
    public class AdicionarOrcamentoValor
    {
        public int IdOrcamento { get; set; }
        public decimal ValorHora { get; set; }
        public decimal Multiplicador { get; set; }
    }

    public class AdicionarOrcamentoValorCommand : IRequest<OrcamentoValorViewModel>
    {
        public int IdOrcamento { get; set; }
        public decimal ValorHora { get; set; }
        public decimal Multiplicador { get; set; }
    }
}
