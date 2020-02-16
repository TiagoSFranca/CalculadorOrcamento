using CalculadorOrcamento.Application.Exceptions;
using CalculadorOrcamento.Application.Orcamentos.Commands.Adicionar;
using CalculadorOrcamento.Application.Orcamentos.Commands.Editar;
using CalculadorOrcamento.Application.Orcamentos.Models;
using CalculadorOrcamento.Application.Orcamentos.Queries.Get;
using CalculadorOrcamento.Application.Orcamentos.Queries.Search;
using CalculadorOrcamento.Application.Paginacoes.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Net;
using System.Threading.Tasks;

namespace CalculadorOrcamento.WebUI.Controllers
{
    public class OrcamentosController : BaseController
    {
        [HttpGet]
        [ProducesResponseType((int)HttpStatusCode.OK, Type = typeof(ConsultaPaginadaViewModel<OrcamentoViewModel>))]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError, Type = typeof(ResponseInternalServerError))]
        public async Task<ActionResult<ConsultaPaginadaViewModel<OrcamentoViewModel>>> Search([FromQuery] string codigo, [FromQuery] string nome, [FromQuery] string descricao,
            [FromQuery] DateTime? dataCriacaoInicial, [FromQuery] DateTime? dataCriacaoFinal, [FromQuery] DateTime? dataAtualizacaoInicial, [FromQuery] DateTime? dataAtualizacaoFinal,
            [FromQuery] string ordenarPor, [FromQuery] bool? asc, [FromQuery]int? pagina, [FromQuery]int? itensPorPagina)
        {
            return Ok(await Mediator.Send(new SearchOrcamentoQuery()
            {
                Codigo = codigo,
                Nome = nome,
                Descricao = descricao,
                DataCriacaoInicial = dataCriacaoInicial,
                DataCriacaoFinal = dataCriacaoFinal,
                DataAtualizacaoInicial = dataAtualizacaoInicial,
                DataAtualizacaoFinal = dataAtualizacaoFinal,
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

        [HttpGet("{id}")]
        [ProducesResponseType((int)HttpStatusCode.OK, Type = typeof(ConsultaPaginadaViewModel<OrcamentoViewModel>))]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError, Type = typeof(ResponseInternalServerError))]
        public async Task<ActionResult<OrcamentoViewModel>> Get(int id)
        {
            return Ok(await Mediator.Send(new GetOrcamentoQuery()
            {
                Id = id
            }));
        }

        [HttpPut("{id}")]
        [ProducesResponseType((int)HttpStatusCode.OK, Type = typeof(ConsultaPaginadaViewModel<OrcamentoViewModel>))]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError, Type = typeof(ResponseInternalServerError))]
        public async Task<ActionResult<OrcamentoViewModel>> Editar(int id, [FromBody]EditarOrcamento model)
        {
            var command = Mapper.Map<EditarOrcamentoCommand>(model);
            command.Id = id;

            return Ok(await Mediator.Send(command));
        }
    }
}