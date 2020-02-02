using CalculadorOrcamento.Application.Paginacoes.Models;
using System.Linq;
using System.Threading.Tasks;

namespace CalculadorOrcamento.Application.Interfaces.BaseApplications
{
    public interface IPaginacaoBaseApplication<TEntity, TViewModel>
        where TEntity : class
        where TViewModel : class
    {
        Task<ConsultaPaginadaViewModel<TViewModel>> Paginar(IQueryable<TEntity> query, PaginacaoViewModel paginacao);
    }
}
