using System.Collections.Generic;
using CalculadorOrcamento.Application.GenericModels;
using CalculadorOrcamento.Application.OrcamentoUsuarioPermissoes.Models;
using CalculadorOrcamento.Application.Usuarios.Models;

namespace CalculadorOrcamento.Application.OrcamentoUsuarios.Models
{
    public class OrcamentoUsuarioViewModel : RegistroTempoViewModel
    {
        public int Id { get; set; }
        public int IdOrcamento { get; set; }
        public int IdUsuario { get; set; }

        public virtual UsuarioViewModel Usuario { get; set; }

        public virtual List<OrcamentoUsuarioPermissaoViewModel> OrcamentoUsuarioPermissoes { get; set; }
    }
}
