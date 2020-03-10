using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CalculadorOrcamento.Application.Interfaces.BaseApplications;
using CalculadorOrcamento.Application.Usuarios.Models;
using CalculadorOrcamento.Common.Helpers;
using CalculadorOrcamento.Domain.Seeds;
using CalculadorOrcamento.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CalculadorOrcamento.Application.OrcamentoUsuarios.Queries.SearchUsuario
{
    public class SearchUsuarioOrcamentoUsuarioQueryHandler : IRequestHandler<SearchUsuarioOrcamentoUsuarioQuery, List<UsuarioViewModel>>
    {
        private readonly CalculadorOrcamentoContext _context;
        private readonly IMapper _mapper;
        private readonly IOrcamentoAuthBaseApplication _orcamentoAuthBaseApplication;

        public SearchUsuarioOrcamentoUsuarioQueryHandler(CalculadorOrcamentoContext context, IMapper mapper, IOrcamentoAuthBaseApplication orcamentoAuthBaseApplication)
        {
            _context = context;
            _mapper = mapper;
            _orcamentoAuthBaseApplication = orcamentoAuthBaseApplication;
        }

        public async Task<List<UsuarioViewModel>> Handle(SearchUsuarioOrcamentoUsuarioQuery request, CancellationToken cancellationToken)
        {
            await _orcamentoAuthBaseApplication.VerificarPermissao(request.IdOrcamento, OrcamentoPermissaoEnum.ADMIN);

            var query = _context.Usuarios.AsQueryable();

            query = query.Where(e => !e.OrcamentoUsuarios.Any(f => f.IdOrcamento == request.IdOrcamento) && !e.Orcamentos.Any(f => f.Id == request.IdOrcamento));

            var termo = (request.Termo ?? string.Empty).ToLower();

            if (!string.IsNullOrEmpty(termo))
                query = query.Where(e =>
                    (e.Nome + " " + e.Sobrenome).ToLower().Contains(termo) ||
                    e.Login.ToLower().Contains(termo) ||
                    e.Email.ToLower().Contains(termo) ||
                    e.Codigo.ToString().ToLower().Contains(termo));


            var resultado = await query.Skip(0).Take(ConstantsHelper.QtdFiltro).ToListAsync();

            return _mapper.Map<List<UsuarioViewModel>>(resultado);
        }
    }
}
