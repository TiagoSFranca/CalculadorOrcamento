using System;

namespace CalculadorOrcamento.Application.Usuarios.Models
{
    public class RefreshTokenViewModel
    {
        public int IdUsuario { get; set; }
        public string Token { get; set; }
        public DateTime DataExpiracao { get; set; }
    }
}
