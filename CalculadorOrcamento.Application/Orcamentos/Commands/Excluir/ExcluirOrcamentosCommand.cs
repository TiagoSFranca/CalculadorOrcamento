using MediatR;
using System.Collections.Generic;

namespace CalculadorOrcamento.Application.Orcamentos.Commands.Excluir
{
    public class ExcluirOrcamentos
    {
        public List<int> Ids { get; set; }
    }

    public class ExcluirOrcamentosCommand : IRequest<string>
    {
        public List<int> Ids { get; set; }
    }
}
