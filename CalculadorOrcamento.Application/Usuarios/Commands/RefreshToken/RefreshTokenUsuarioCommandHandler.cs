using AutoMapper;
using CalculadorOrcamento.Application.Exceptions;
using CalculadorOrcamento.Application.Interfaces.BaseApplications;
using CalculadorOrcamento.Application.Interfaces.Infrastructure.Services;
using CalculadorOrcamento.Application.Usuarios.Models;
using CalculadorOrcamento.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace CalculadorOrcamento.Application.Usuarios.Commands.RefreshToken
{
    public class RefreshTokenUsuarioCommandHandler : IRequestHandler<RefreshTokenUsuarioCommand, UsuarioAutenticadoViewModel>
    {
        private readonly CalculadorOrcamentoContext _context;
        private readonly IJwtService _jwtService;
        private readonly IRefreshTokenBaseApplication _refreshTokenBaseApplication;
        private readonly IMapper _mapper;

        public RefreshTokenUsuarioCommandHandler(CalculadorOrcamentoContext context, IJwtService jwtService, IRefreshTokenBaseApplication refreshTokenBaseApplication, IMapper mapper)
        {
            _context = context;
            _jwtService = jwtService;
            _refreshTokenBaseApplication = refreshTokenBaseApplication;
            _mapper = mapper;
        }

        public async Task<UsuarioAutenticadoViewModel> Handle(RefreshTokenUsuarioCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.RefreshTokens.FirstOrDefaultAsync(e => e.Token.Equals(request.Token));
            if (entity == null)
                throw new BusinessException("Refres Token não encontrado");

            var usuario = _mapper.Map<UsuarioAutenticadoViewModel>(entity.Usuario);

            var token = _jwtService.CreateToken(usuario);

            await _refreshTokenBaseApplication.SaveRefreshToken(token.RefreshToken);

            usuario.Token = token.AccessToken;
            usuario.RefreshToken = token.RefreshToken.Token;

            return usuario;
        }
    }
}
