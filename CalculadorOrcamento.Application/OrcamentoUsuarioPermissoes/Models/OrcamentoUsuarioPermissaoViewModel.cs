using CalculadorOrcamento.Application.GenericModels;
using CalculadorOrcamento.Application.OrcamentoPermissoes.Models;

namespace CalculadorOrcamento.Application.OrcamentoUsuarioPermissoes.Models
{
    public class OrcamentoUsuarioPermissaoViewModel : RegistroTempoViewModel
    {
        public int Id { get; set; }
        public int IdOrcamentoUsuario { get; set; }
        public int IdPermissao { get; set; }
        public bool Permite { get; set; }

        public virtual OrcamentoPermissaoViewModel Permissao { get; set; }
    }
}
