using CalculadorOrcamento.Application.Orcamentos.Models;
using MediatR;

namespace CalculadorOrcamento.Application.Orcamentos.Commands.Adicionar
{
    public class AdicionarOrcamento
    {
        public string Nome { get; set; }
        public string Descricao { get; set; }
    }


    public class AdicionarOrcamentoCommand : IRequest<OrcamentoViewModel>
    {
        public string Nome { get; set; }
        public string Descricao { get; set; }
    }
}
