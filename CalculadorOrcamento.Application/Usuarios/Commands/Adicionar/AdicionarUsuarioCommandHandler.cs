using AutoMapper;
using CalculadorOrcamento.Application.Exceptions;
using CalculadorOrcamento.Application.Usuarios.Models;
using CalculadorOrcamento.Common.Helpers;
using CalculadorOrcamento.Domain.Entities;
using CalculadorOrcamento.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace CalculadorOrcamento.Application.Usuarios.Commands.Adicionar
{
    public class AdicionarUsuarioCommandHandler : IRequestHandler<AdicionarUsuarioCommand, UsuarioViewModel>
    {
        private readonly CalculadorOrcamentoContext _context;
        private readonly IMapper _mapper;

        public AdicionarUsuarioCommandHandler(CalculadorOrcamentoContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<UsuarioViewModel> Handle(AdicionarUsuarioCommand request, CancellationToken cancellationToken)
        {
            var existe = await _context.Usuarios.AnyAsync(e => e.Email.ToLower().Equals(request.Email.ToLower()) || e.Login.ToLower().Equals(request.Login.ToLower()));

            if (existe)
                throw new BusinessException("E-mail ou login já cadastrados");

            if (!request.Senha.ToLower().Equals(request.ConfirmarSenha.ToLower()))
                throw new BusinessException("Senhas diferem");


            var entity = _mapper.Map<Usuario>(request);
            entity.Senha = PasswordHasher.HashPassword(request.Senha);

            try
            {
                entity.Codigo = Guid.NewGuid();
                _context.Usuarios.Add(entity);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new PersistenceException(ex);
            }
            //TODO: Enviar e-mail
            return _mapper.Map<UsuarioViewModel>(entity);
        }
    }
}
