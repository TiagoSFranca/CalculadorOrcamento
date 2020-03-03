using CalculadorOrcamento.Domain.Entities.GenericModels;
using System;

namespace CalculadorOrcamento.Domain.Entities
{
    public class RefreshToken : RegistroTempo
    {
        public int Id { get; set; }
        public int IdUsuario { get; set; }
        public string Token { get; set; }
        public DateTime DataExpiracao { get; set; }
    }
}
