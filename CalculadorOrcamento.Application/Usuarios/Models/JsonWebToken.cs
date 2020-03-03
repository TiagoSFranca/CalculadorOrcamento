namespace CalculadorOrcamento.Application.Usuarios.Models
{
    public class JsonWebToken
    {
        public string AccessToken { get; set; }
        public RefreshTokenViewModel RefreshToken { get; set; }
        public string TokenType { get; set; } = "bearer";
    }
}
