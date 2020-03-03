using CalculadorOrcamento.Application.Interfaces.Infrastructure.Services;
using CalculadorOrcamento.Application.Settings.Models;
using CalculadorOrcamento.Application.Usuarios.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace CalculadorOrcamento.Infrastructure.Services
{
    public class JwtService : IJwtService
    {
        private readonly AppSettings _appSettings;

        public JwtService(IOptions<AppSettings> appSettingsOptions)
        {
            _appSettings = appSettingsOptions.Value;
        }


        public JsonWebToken CreateToken(UsuarioViewModel usuario)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.SecretKey);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(GetUserClaims(usuario)),
                Expires = DateTime.Now.AddDays(_appSettings.JwtSettings.Expiration),
                NotBefore = DateTime.Now,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var stringToken = tokenHandler.WriteToken(token);


            return new JsonWebToken
            {
                AccessToken = stringToken,
                RefreshToken = CreateRefreshToken(usuario.Id)
            };
        }

        private RefreshTokenViewModel CreateRefreshToken(int idUsuario)
        {
            var refreshToken = new RefreshTokenViewModel
            {
                IdUsuario = idUsuario,
                DataExpiracao = DateTime.Now.AddDays(_appSettings.JwtSettings.Expiration)
            };

            string token;
            var randomNumber = new byte[32];

            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                token = Convert.ToBase64String(randomNumber);
            }

            refreshToken.Token = token.Replace("+", string.Empty)
                .Replace("=", string.Empty)
                .Replace("/", string.Empty);

            return refreshToken;
        }

        private IEnumerable<Claim> GetUserClaims(UsuarioViewModel usuario)
        {
            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, usuario.Nome),
                new Claim(ClaimTypes.Sid, usuario.Id.ToString()),
            };

            return claims;
        }
    }
}
