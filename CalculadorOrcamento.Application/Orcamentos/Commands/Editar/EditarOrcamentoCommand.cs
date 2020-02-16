using CalculadorOrcamento.Application.Orcamentos.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace CalculadorOrcamento.Application.Orcamentos.Commands.Editar
{
    public class EditarOrcamento
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }
    }

    public class EditarOrcamentoCommand : IRequest<OrcamentoViewModel>
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }
    }
}
