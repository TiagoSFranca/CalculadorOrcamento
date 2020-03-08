using CalculadorOrcamento.Application.OrcamentoUsuarios.Models;
using MediatR;
using System.Collections.Generic;

namespace CalculadorOrcamento.Application.OrcamentoUsuarios.Commands.Editar
{
    public class EditarOrcamentoUsuario
    {
        public int Id { get; set; }
        public int IdOrcamento { get; set; }
        public List<int> Permissoes { get; set; }
    }

    public class EditarOrcamentoUsuarioCommand : IRequest<OrcamentoUsuarioViewModel>
    {
        public int Id { get; set; }
        public int IdOrcamento { get; set; }
        public List<int> Permissoes { get; set; }
    }
}
