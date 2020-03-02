using CalculadorOrcamento.Application.OrcamentoValores.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace CalculadorOrcamento.Application.OrcamentoValores.Commands.Editar
{
    public class EditarOrcamentoValor
    {
        public int Id { get; set; }
        public int IdOrcamento { get; set; }
        public decimal ValorHora { get; set; }
        public decimal Multiplicador { get; set; }
    }

    public class EditarOrcamentoValorCommand : IRequest<OrcamentoValorViewModel>
    {
        public int Id { get; set; }
        public int IdOrcamento { get; set; }
        public decimal ValorHora { get; set; }
        public decimal Multiplicador { get; set; }
    }
}
