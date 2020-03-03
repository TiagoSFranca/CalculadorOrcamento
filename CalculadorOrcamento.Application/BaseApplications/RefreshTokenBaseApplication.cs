using AutoMapper;
using CalculadorOrcamento.Application.Exceptions;
using CalculadorOrcamento.Application.Interfaces.BaseApplications;
using CalculadorOrcamento.Application.Usuarios.Models;
using CalculadorOrcamento.Domain.Entities;
using CalculadorOrcamento.Persistence;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace CalculadorOrcamento.Application.BaseApplications
{
    public class RefreshTokenBaseApplication : IRefreshTokenBaseApplication
    {
        private readonly CalculadorOrcamentoContext _context;
        private readonly IMapper _mapper;

        public RefreshTokenBaseApplication(CalculadorOrcamentoContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task SaveRefreshToken(RefreshTokenViewModel model)
        {
            var existe = await _context.Usuarios.AnyAsync(e => e.Id == model.IdUsuario);
            if (!existe)
                throw new BusinessException("Usuário não encontrado");

            var token = await _context.RefreshTokens.FirstOrDefaultAsync(e => e.IdUsuario == model.IdUsuario);

            var entity = _mapper.Map<RefreshToken>(model);

            try
            {
                if (token != null)
                    _context.RefreshTokens.Remove(token);

                _context.RefreshTokens.Add(entity);

                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new PersistenceException(ex);
            }

        }
    }
}
