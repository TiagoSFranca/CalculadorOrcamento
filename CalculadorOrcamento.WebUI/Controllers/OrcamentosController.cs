using CalculadorOrcamento.Application.Exceptions;
using CalculadorOrcamento.Application.Orcamentos.Models;
using CalculadorOrcamento.Application.Orcamentos.Queries.Search;
using CalculadorOrcamento.Application.Paginacoes.Models;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Threading.Tasks;

namespace CalculadorOrcamento.WebUI.Controllers
{
    public class OrcamentosController : BaseController
    {
        [HttpGet]
        [ProducesResponseType((int)HttpStatusCode.OK, Type = typeof(ConsultaPaginadaViewModel<OrcamentoViewModel>))]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError, Type = typeof(ResponseInternalServerError))]
        public async Task<ActionResult<ConsultaPaginadaViewModel<OrcamentoViewModel>>> Get([FromQuery]int? pagina, [FromQuery]int? itensPorPagina)
        {
            return Ok(await Mediator.Send(new SearchOrcamentoQuery()
            {
                Paginacao = new PaginacaoViewModel(pagina, itensPorPagina)
            }));
        }
    }
}