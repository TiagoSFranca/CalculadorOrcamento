using AutoMapper;
using CalculadorOrcamento.Application.Exceptions;
using CalculadorOrcamento.Application.Interfaces.BaseApplications;
using CalculadorOrcamento.Application.Orcamentos.Models;
using CalculadorOrcamento.Domain.Entities;
using CalculadorOrcamento.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace CalculadorOrcamento.Application.Orcamentos.Commands.Adicionar
{
    public class AdicionarOrcamentoCommandHandler : IRequestHandler<AdicionarOrcamentoCommand, OrcamentoViewModel>
    {
        private readonly IMapper _mapper;
        private readonly CalculadorOrcamentoContext _context;
        private readonly IAuthBaseApplication _authBaseApplication;
        
        public AdicionarOrcamentoCommandHandler(IMapper mapper, CalculadorOrcamentoContext context, IAuthBaseApplication authBaseApplication)
        {
            _mapper = mapper;
            _context = context;
            _authBaseApplication = authBaseApplication;
        }

        public async Task<OrcamentoViewModel> Handle(AdicionarOrcamentoCommand request, CancellationToken cancellationToken)
        {
            var id = _authBaseApplication.GetId();

            var existe = await _context.Orcamentos.AnyAsync(e => e.Nome.ToLower().Equals(request.Nome.ToLower()) && e.IdUsuario == id);
            if (existe)
                throw new BusinessException(string.Format("Orçamento já cadastrado com esse nome [{0}]", request.Nome));

            var entity = _mapper.Map<Orcamento>(request);

            try
            {
                entity.Codigo = Guid.NewGuid();
                entity.IdUsuario = id;

                _context.Orcamentos.Add(entity);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new PersistenceException(ex);
            }

            return _mapper.Map<OrcamentoViewModel>(entity);
        }
    }
}
