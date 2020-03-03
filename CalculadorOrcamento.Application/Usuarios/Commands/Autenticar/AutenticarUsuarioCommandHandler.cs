using AutoMapper;
using CalculadorOrcamento.Application.Exceptions;
using CalculadorOrcamento.Application.Interfaces.BaseApplications;
using CalculadorOrcamento.Application.Interfaces.Infrastructure.Services;
using CalculadorOrcamento.Application.Usuarios.Models;
using CalculadorOrcamento.Common.Helpers;
using CalculadorOrcamento.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace CalculadorOrcamento.Application.Usuarios.Commands.Autenticar
{
    public class AutenticarUsuarioCommandHandler : IRequestHandler<AutenticarUsuarioCommand, UsuarioAutenticadoViewModel>
    {
        private readonly CalculadorOrcamentoContext _context;
        private readonly IJwtService _jwtService;
        private readonly IRefreshTokenBaseApplication _refreshTokenBaseApplication;
        private readonly IMapper _mapper;

        private BusinessException _erroLogin => new BusinessException("Login ou Senha inválidos");

        public AutenticarUsuarioCommandHandler(CalculadorOrcamentoContext context, IJwtService jwtService, IRefreshTokenBaseApplication refreshTokenBaseApplication, IMapper mapper)
        {
            _context = context;
            _jwtService = jwtService;
            _refreshTokenBaseApplication = refreshTokenBaseApplication;
            _mapper = mapper;
        }

        public async Task<UsuarioAutenticadoViewModel> Handle(AutenticarUsuarioCommand request, CancellationToken cancellationToken)
        {
            var existe = await _context.Usuarios.FirstOrDefaultAsync(e => e.Email.ToLower().Equals(request.Login.ToLower()) || e.Login.ToLower().Equals(request.Login.ToLower()));
            if (existe == null)
                throw _erroLogin;

            if (PasswordHasher.VerifyHashedPassword(existe.Senha, request.Senha) != PasswordVerificationResult.Success)
                throw _erroLogin;

            var usuario = _mapper.Map<UsuarioAutenticadoViewModel>(existe);

            var token = _jwtService.CreateToken(usuario);

            await _refreshTokenBaseApplication.SaveRefreshToken(token.RefreshToken);

            usuario.Token = token.AccessToken;
            usuario.RefreshToken = token.RefreshToken.Token;

            return usuario;
        }
    }
}
