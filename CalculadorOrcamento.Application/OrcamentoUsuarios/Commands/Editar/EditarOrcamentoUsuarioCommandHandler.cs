using AutoMapper;
using CalculadorOrcamento.Application.Exceptions;
using CalculadorOrcamento.Application.Interfaces.BaseApplications;
using CalculadorOrcamento.Application.OrcamentoUsuarios.Models;
using CalculadorOrcamento.Domain.Seeds;
using CalculadorOrcamento.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace CalculadorOrcamento.Application.OrcamentoUsuarios.Commands.Editar
{
    public class EditarOrcamentoUsuarioCommandHandler : IRequestHandler<EditarOrcamentoUsuarioCommand, OrcamentoUsuarioViewModel>
    {
        private readonly CalculadorOrcamentoContext _context;
        private readonly IMapper _mapper;
        private readonly IOrcamentoAuthBaseApplication _orcamentoAuthBaseApplication;

        public EditarOrcamentoUsuarioCommandHandler(CalculadorOrcamentoContext context, IMapper mapper, IOrcamentoAuthBaseApplication orcamentoAuthBaseApplication)
        {
            _context = context;
            _mapper = mapper;
            _orcamentoAuthBaseApplication = orcamentoAuthBaseApplication;
        }

        public async Task<OrcamentoUsuarioViewModel> Handle(EditarOrcamentoUsuarioCommand request, CancellationToken cancellationToken)
        {
            await _orcamentoAuthBaseApplication.VerificarPermissao(request.IdOrcamento, OrcamentoPermissaoEnum.ADMIN);

            var entidade = await _context.OrcamentoUsuarios.FindAsync(request.Id);
            if (entidade == null)
                throw new NotFoundException("Orçamento usuário", request.Id);

            if (entidade.IdOrcamento != request.IdOrcamento)
                throw new BusinessException("Item não pertence ao orçamento");

            var permissoes = (request.Permissoes ?? new List<int>()).Distinct().ToList();

            var permissoesInvalidas = permissoes.Except(OrcamentoPermissaoSeed.Seeds.Select(e => e.Id).ToList()).ToList();

            if (permissoesInvalidas.Count() > 0)
                throw new BusinessException(string.Format("Permissões ([{0}]) inválidas", string.Join(", ", permissoesInvalidas)));

            var permissoesEntidades = await _context.OrcamentoUsuarioPermissoes.Where(e => e.IdOrcamentoUsuario == request.Id).ToListAsync();

            try
            {
                permissoesEntidades.ForEach(x => x.Permite = permissoes.Contains(x.IdPermissao));

                _context.OrcamentoUsuarioPermissoes.UpdateRange(permissoesEntidades);

                _context.OrcamentoUsuarios.Update(entidade);

                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new PersistenceException(ex);
            }

            return _mapper.Map<OrcamentoUsuarioViewModel>(entidade);
        }
    }
}
