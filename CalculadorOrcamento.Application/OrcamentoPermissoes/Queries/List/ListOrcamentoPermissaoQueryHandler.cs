using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CalculadorOrcamento.Application.Interfaces.BaseApplications;
using CalculadorOrcamento.Application.OrcamentoPermissoes.Models;
using CalculadorOrcamento.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CalculadorOrcamento.Application.OrcamentoPermissoes.Queries.List
{
    public class ListOrcamentoPermissaoQueryHandler : IRequestHandler<ListOrcamentoPermissaoQuery, List<OrcamentoPermissaoViewModel>>
    {
        private readonly CalculadorOrcamentoContext _context;
        private readonly IMapper _mapper;
        private readonly IAuthBaseApplication _authBaseApplication;

        public ListOrcamentoPermissaoQueryHandler(CalculadorOrcamentoContext context, IMapper mapper, IAuthBaseApplication authBaseApplication)
        {
            _context = context;
            _mapper = mapper;
            _authBaseApplication = authBaseApplication;
        }

        public async Task<List<OrcamentoPermissaoViewModel>> Handle(ListOrcamentoPermissaoQuery request, CancellationToken cancellationToken)
        {
            _authBaseApplication.CheckIsAuth();

            var data = await _context.OrcamentoPermissoes.ToListAsync();

            return _mapper.Map<List<OrcamentoPermissaoViewModel>>(data);
        }
    }
}
