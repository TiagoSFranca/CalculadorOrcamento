using AutoMapper;
using CalculadorOrcamento.Application.Exceptions;
using CalculadorOrcamento.Application.Interfaces.BaseApplications;
using CalculadorOrcamento.Application.OrcamentoUsuarios.Models;
using CalculadorOrcamento.Domain.Entities;
using CalculadorOrcamento.Domain.Seeds;
using CalculadorOrcamento.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace CalculadorOrcamento.Application.OrcamentoUsuarios.Commands.Adicionar
{
    public class AdicionarOrcamentoUsuarioCommandHandler : IRequestHandler<AdicionarOrcamentoUsuarioCommand, OrcamentoUsuarioViewModel>
    {
        private readonly CalculadorOrcamentoContext _context;
        private readonly IMapper _mapper;
        private readonly IOrcamentoAuthBaseApplication _orcamentoAuthBaseApplication;

        public AdicionarOrcamentoUsuarioCommandHandler(CalculadorOrcamentoContext context, IMapper mapper, IOrcamentoAuthBaseApplication orcamentoAuthBaseApplication)
        {
            _context = context;
            _mapper = mapper;
            _orcamentoAuthBaseApplication = orcamentoAuthBaseApplication;
        }

        public async Task<OrcamentoUsuarioViewModel> Handle(AdicionarOrcamentoUsuarioCommand request, CancellationToken cancellationToken)
        {
            await _orcamentoAuthBaseApplication.VerificarPermissao(request.IdOrcamento, OrcamentoPermissaoEnum.ADMIN);

            var existeOrcamento = await _context.Orcamentos.AnyAsync(e => e.Id == request.IdOrcamento);
            if (!existeOrcamento)
                throw new NotFoundException(nameof(Orcamento), request.IdOrcamento);

            var existeUsuario = await _context.Usuarios.AnyAsync(e => e.Id == request.IdUsuario);
            if (!existeUsuario)
                throw new NotFoundException("Usuário não encontrado");

            var existe = await _context.OrcamentoUsuarios.AnyAsync(e => e.IdOrcamento == request.IdOrcamento && e.IdUsuario == request.IdUsuario);
            if (existe)
                throw new BusinessException("Usuário já adicionado ao orçamento");

            var permissoes = (request.Permissoes ?? new List<int>()).Distinct().ToList();

            var permissoesInvalidas = permissoes.Except(OrcamentoPermissaoSeed.Seeds.Select(e => e.Id).ToList()).ToList();

            if (permissoesInvalidas.Count() > 0)
                throw new BusinessException(string.Format("Permissões ([{0}]) inválidas", string.Join(", ", permissoesInvalidas)));

            var entidade = new OrcamentoUsuario();

            try
            {
                _context.OrcamentoUsuarios.Add(entidade);

                var lista = MontarListaPermissoes(permissoes, entidade);
                _context.OrcamentoUsuarioPermissoes.AddRange(lista);

                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new PersistenceException(ex);
            }

            return _mapper.Map<OrcamentoUsuarioViewModel>(entidade);
        }

        private List<OrcamentoUsuarioPermissao> MontarListaPermissoes(List<int> permissoes, OrcamentoUsuario orcamentoUsuario)
        {
            List<OrcamentoUsuarioPermissao> lista = new List<OrcamentoUsuarioPermissao>();

            if ((permissoes.Contains(OrcamentoPermissaoSeed.Editar.Id) || permissoes.Contains(OrcamentoPermissaoSeed.Excluir.Id)) && !permissoes.Contains(OrcamentoPermissaoSeed.Visualizar.Id))
                permissoes.Add(OrcamentoPermissaoSeed.Visualizar.Id);

            OrcamentoPermissaoSeed.Seeds.ForEach(e =>
            {
                lista.Add(new OrcamentoUsuarioPermissao()
                {
                    IdPermissao = e.Id,
                    OrcamentoUsuario = orcamentoUsuario,
                    Permite = permissoes.Contains(e.Id)
                });
            });

            return lista;
        }
    }
}
