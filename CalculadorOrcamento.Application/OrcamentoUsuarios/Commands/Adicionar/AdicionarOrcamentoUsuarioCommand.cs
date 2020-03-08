using CalculadorOrcamento.Application.OrcamentoUsuarios.Models;
using MediatR;
using System.Collections.Generic;

namespace CalculadorOrcamento.Application.OrcamentoUsuarios.Commands.Adicionar
{
    public class AdicionarOrcamentoUsuario
    {
        public int IdOrcamento { get; set; }
        public int IdUsuario { get; set; }
        public List<int> Permissoes { get; set; }
    }

    public class AdicionarOrcamentoUsuarioCommand : IRequest<OrcamentoUsuarioViewModel>
    {
        public int IdOrcamento { get; set; }
        public int IdUsuario { get; set; }
        public List<int> Permissoes { get; set; }
    }
}
