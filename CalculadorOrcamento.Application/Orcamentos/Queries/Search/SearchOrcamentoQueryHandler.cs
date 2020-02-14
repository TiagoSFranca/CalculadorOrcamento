using CalculadorOrcamento.Application.Interfaces.BaseApplications;
using CalculadorOrcamento.Application.Orcamentos.Models;
using CalculadorOrcamento.Application.Paginacoes.Models;
using CalculadorOrcamento.Domain.Entities;
using CalculadorOrcamento.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace CalculadorOrcamento.Application.Orcamentos.Queries.Search
{
    public class SearchOrcamentoQueryHandler : IRequestHandler<SearchOrcamentoQuery, ConsultaPaginadaViewModel<OrcamentoViewModel>>
    {
        private readonly CalculadorOrcamentoContext _context;
        private readonly IPaginacaoBaseApplication<Orcamento, OrcamentoViewModel> _paginacaoBaseApplication;

        public SearchOrcamentoQueryHandler(CalculadorOrcamentoContext context, IPaginacaoBaseApplication<Orcamento, OrcamentoViewModel> paginacaoBaseApplication)
        {
            _context = context;
            _paginacaoBaseApplication = paginacaoBaseApplication;
        }

        public async Task<ConsultaPaginadaViewModel<OrcamentoViewModel>> Handle(SearchOrcamentoQuery request, CancellationToken cancellationToken)
        {
            var query = _context.Orcamentos.AsQueryable();

            var filtros = request.Filtros;

            if ((filtros ?? new Dictionary<string, string>()).Any())
            {
                foreach (var item in filtros)
                {
                    if (Enum.TryParse(item.Key, true, out OrdenacaoOrcamento filtroEnum) && !string.IsNullOrEmpty(item.Value))
                    {

                        switch (filtroEnum)
                        {
                            case OrdenacaoOrcamento.Id:
                                if (Int32.TryParse(item.Value, out int id))
                                    query = query.Where(e => e.Id == id);
                                break;
                            case OrdenacaoOrcamento.Codigo:
                                query = query.Where(e => e.Codigo.ToString().ToLower().Contains(item.Value.ToLower()));
                                break;
                            case OrdenacaoOrcamento.Nome:
                                query = query.Where(e => e.Nome.ToString().ToLower().Contains(item.Value.ToLower()));
                                break;
                            case OrdenacaoOrcamento.Descricao:
                                query = query.Where(e => e.Descricao.ToString().ToLower().Contains(item.Value.ToLower()));
                                break;
                            case OrdenacaoOrcamento.DataCriacao:
                                break;
                            case OrdenacaoOrcamento.DataAtualizacao:
                                break;
                            default:
                                break;
                        }
                    }
                }

            }


            var ordenar = OrdenacaoOrcamento.Id;

            Enum.TryParse(request.Ordenar, true, out ordenar);

            switch (ordenar)
            {
                case OrdenacaoOrcamento.Codigo:
                    query = request.Asc ? query.OrderBy(e => e.Codigo) : query.OrderByDescending(e => e.Codigo);
                    break;
                case OrdenacaoOrcamento.Nome:
                    query = request.Asc ? query.OrderBy(e => e.Nome) : query.OrderByDescending(e => e.Nome);
                    break;
                case OrdenacaoOrcamento.Descricao:
                    query = request.Asc ? query.OrderBy(e => e.Descricao) : query.OrderByDescending(e => e.Descricao);
                    break;
                case OrdenacaoOrcamento.DataCriacao:
                    query = request.Asc ? query.OrderBy(e => e.DataCriacao) : query.OrderByDescending(e => e.DataCriacao);
                    break;
                case OrdenacaoOrcamento.DataAtualizacao:
                    query = request.Asc ? query.OrderBy(e => e.DataAtualizacao) : query.OrderByDescending(e => e.DataAtualizacao);
                    break;
                case OrdenacaoOrcamento.Id:
                default:
                    query = request.Asc ? query.OrderBy(e => e.Id) : query.OrderByDescending(e => e.Id);
                    break;
            }

            var paginacao = request.Paginacao ?? new PaginacaoViewModel();

            var retorno = await _paginacaoBaseApplication.Paginar(query, paginacao);

            return retorno;
        }
    }
}
