namespace CalculadorOrcamento.Application.Usuarios.Models
{
    public class UsuarioAutenticadoViewModel : UsuarioViewModel
    {
        public string Token { get; set; }
        public string RefreshToken { get; set; }
    }
}
