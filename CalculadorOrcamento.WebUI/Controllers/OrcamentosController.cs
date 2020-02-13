using CalculadorOrcamento.Application.Exceptions;
using CalculadorOrcamento.Application.Orcamentos.Commands.Adicionar;
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
        public async Task<ActionResult<ConsultaPaginadaViewModel<OrcamentoViewModel>>> Get([FromQuery] string ordenarPor, [FromQuery] bool? asc,
            [FromQuery]int? pagina, [FromQuery]int? itensPorPagina)
        {
            return Ok(await Mediator.Send(new SearchOrcamentoQuery()
            {
                Ordenar = ordenarPor,
                Asc = asc.HasValue ? (bool)asc : true,
                Paginacao = new PaginacaoViewModel(pagina, itensPorPagina)
            }));
        }

        [HttpPost]
        //[Authorize]
        [ProducesResponseType((int)HttpStatusCode.OK, Type = typeof(OrcamentoViewModel))]
        [ProducesResponseType((int)HttpStatusCode.BadRequest, Type = typeof(ResponseBadRequest))]
        //[ProducesResponseType((int)HttpStatusCode.Unauthorized, Type = typeof(ResponseUnauthorized))]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError, Type = typeof(ResponseInternalServerError))]
        public async Task<ActionResult<OrcamentoViewModel>> Adicionar([FromBody]AdicionarOrcamento model)
        {
            var command = Mapper.Map<AdicionarOrcamentoCommand>(model);

            return Ok(await Mediator.Send(command));
        }
    }
}