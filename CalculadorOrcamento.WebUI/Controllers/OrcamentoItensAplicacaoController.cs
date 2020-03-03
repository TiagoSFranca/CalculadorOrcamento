using CalculadorOrcamento.Application.Exceptions;
using CalculadorOrcamento.Application.OrcamentoItensAplicacao.Commands.Adicionar;
using CalculadorOrcamento.Application.OrcamentoItensAplicacao.Commands.Editar;
using CalculadorOrcamento.Application.OrcamentoItensAplicacao.Commands.Excluir;
using CalculadorOrcamento.Application.OrcamentoItensAplicacao.Models;
using CalculadorOrcamento.Application.OrcamentoItensAplicacao.Queries.Search;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace CalculadorOrcamento.WebUI.Controllers
{
    public class OrcamentoItensAplicacaoController : BaseController
    {
        [HttpGet]
        [Authorize]
        [ProducesResponseType((int)HttpStatusCode.OK, Type = typeof(List<OrcamentoItemAplicacaoViewModel>))]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized, Type = typeof(ResponseUnauthorized))]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError, Type = typeof(ResponseInternalServerError))]
        public async Task<ActionResult<List<OrcamentoItemAplicacaoViewModel>>> Search([FromQuery] int idOrcamento)
        {
            return Ok(await Mediator.Send(new SearchOrcamentoItemAplicacaoQuery()
            {
                IdOrcamento = idOrcamento
            }));
        }

        [HttpPost]
        [Authorize]
        [ProducesResponseType((int)HttpStatusCode.OK, Type = typeof(OrcamentoItemAplicacaoViewModel))]
        [ProducesResponseType((int)HttpStatusCode.BadRequest, Type = typeof(ResponseBadRequest))]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized, Type = typeof(ResponseUnauthorized))]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError, Type = typeof(ResponseInternalServerError))]
        public async Task<ActionResult<OrcamentoItemAplicacaoViewModel>> Adicionar([FromBody]AdicionarOrcamentoItemAplicacao model)
        {
            var command = Mapper.Map<AdicionarOrcamentoItemAplicacaoCommand>(model);

            return Ok(await Mediator.Send(command));
        }

        [HttpPut("{id}")]
        [Authorize]
        [ProducesResponseType((int)HttpStatusCode.OK, Type = typeof(OrcamentoItemAplicacaoViewModel))]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized, Type = typeof(ResponseUnauthorized))]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError, Type = typeof(ResponseInternalServerError))]
        public async Task<ActionResult<OrcamentoItemAplicacaoViewModel>> Editar(int id, [FromBody]EditarOrcamentoItemAplicacao model)
        {
            var command = Mapper.Map<EditarOrcamentoItemAplicacaoCommand>(model);
            command.Id = id;

            return Ok(await Mediator.Send(command));
        }

        [HttpDelete("{id}")]
        [Authorize]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized, Type = typeof(ResponseUnauthorized))]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError, Type = typeof(ResponseInternalServerError))]
        public async Task<IActionResult> Excluir(int id)
        {
            var command = new ExcluirOrcamentoItemAplicacaoCommand() { Id = id };

            return Ok(await Mediator.Send(command));
        }
    }
}
