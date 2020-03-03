using CalculadorOrcamento.Application.Exceptions;
using CalculadorOrcamento.Application.OrcamentoValores.Commands.Adicionar;
using CalculadorOrcamento.Application.OrcamentoValores.Commands.Editar;
using CalculadorOrcamento.Application.OrcamentoValores.Commands.Excluir;
using CalculadorOrcamento.Application.OrcamentoValores.Models;
using CalculadorOrcamento.Application.OrcamentoValores.Queries.Search;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace CalculadorOrcamento.WebUI.Controllers
{
    public class OrcamentoValoresController : BaseController
    {
        [HttpGet]
        [Authorize]
        [ProducesResponseType((int)HttpStatusCode.OK, Type = typeof(List<OrcamentoValorViewModel>))]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized, Type = typeof(ResponseUnauthorized))]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError, Type = typeof(ResponseInternalServerError))]
        public async Task<ActionResult<List<OrcamentoValorViewModel>>> Search([FromQuery] int idOrcamento)
        {
            return Ok(await Mediator.Send(new SearchOrcamentoValorQuery()
            {
                IdOrcamento = idOrcamento
            }));
        }

        [HttpPost]
        [Authorize]
        [ProducesResponseType((int)HttpStatusCode.OK, Type = typeof(OrcamentoValorViewModel))]
        [ProducesResponseType((int)HttpStatusCode.BadRequest, Type = typeof(ResponseBadRequest))]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized, Type = typeof(ResponseUnauthorized))]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError, Type = typeof(ResponseInternalServerError))]
        public async Task<ActionResult<OrcamentoValorViewModel>> Adicionar([FromBody]AdicionarOrcamentoValor model)
        {
            var command = Mapper.Map<AdicionarOrcamentoValorCommand>(model);

            return Ok(await Mediator.Send(command));
        }

        [HttpPut("{id}")]
        [Authorize]
        [ProducesResponseType((int)HttpStatusCode.OK, Type = typeof(OrcamentoValorViewModel))]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized, Type = typeof(ResponseUnauthorized))]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError, Type = typeof(ResponseInternalServerError))]
        public async Task<ActionResult<OrcamentoValorViewModel>> Editar(int id, [FromBody]EditarOrcamentoValor model)
        {
            var command = Mapper.Map<EditarOrcamentoValorCommand>(model);
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
            var command = new ExcluirOrcamentoValorCommand() { Id = id };

            return Ok(await Mediator.Send(command));
        }
    }
}
