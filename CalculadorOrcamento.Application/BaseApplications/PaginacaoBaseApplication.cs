using AutoMapper;
using CalculadorOrcamento.Application.Interfaces.BaseApplications;
using CalculadorOrcamento.Application.Paginacoes.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CalculadorOrcamento.Application.BaseApplications
{
    public class PaginacaoBaseApplication<TEntity, TViewModel> : IPaginacaoBaseApplication<TEntity, TViewModel>
        where TEntity : class
        where TViewModel : class
    {
        private readonly IMapper _mapper;

        public PaginacaoBaseApplication(IMapper mapper)
        {
            _mapper = mapper;
        }

        public async Task<ConsultaPaginadaViewModel<TViewModel>> Paginar(IQueryable<TEntity> query, PaginacaoViewModel paginacao)
        {
            var totalItens = await query.CountAsync();

            var result = await query.Skip((paginacao.Pagina - 1) * paginacao.ItensPorPagina).Take(paginacao.ItensPorPagina).ToListAsync();

            var retorno = new ConsultaPaginadaViewModel<TViewModel>(paginacao.Pagina, paginacao.ItensPorPagina)
            {
                TotalItens = totalItens,
                Itens = _mapper.Map<List<TViewModel>>(result)
            };

            return retorno;
        }
    }
}
