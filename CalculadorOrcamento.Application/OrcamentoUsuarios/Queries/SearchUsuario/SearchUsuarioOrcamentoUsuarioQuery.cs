using System.Collections.Generic;
using CalculadorOrcamento.Application.Usuarios.Models;
using MediatR;

namespace CalculadorOrcamento.Application.OrcamentoUsuarios.Queries.SearchUsuario
{
    public class SearchUsuarioOrcamentoUsuarioQuery : IRequest<List<UsuarioViewModel>>
    {
        public int IdOrcamento { get; set; }
        public string Termo { get; set; }
    }
}
