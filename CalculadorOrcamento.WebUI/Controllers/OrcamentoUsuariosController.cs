using CalculadorOrcamento.Application.Exceptions;
using CalculadorOrcamento.Application.OrcamentoUsuarios.Commands.Adicionar;
using CalculadorOrcamento.Application.OrcamentoUsuarios.Commands.Editar;
using CalculadorOrcamento.Application.OrcamentoUsuarios.Commands.Excluir;
using CalculadorOrcamento.Application.OrcamentoUsuarios.Models;
using CalculadorOrcamento.Application.OrcamentoUsuarios.Queries.Search;
using CalculadorOrcamento.Application.OrcamentoUsuarios.Queries.SearchUsuario;
using CalculadorOrcamento.Application.Usuarios.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace CalculadorOrcamento.WebUI.Controllers
{
    public class OrcamentoUsuariosController : BaseController
    {
        [HttpGet]
        [Authorize]
        [ProducesResponseType((int)HttpStatusCode.OK, Type = typeof(List<OrcamentoUsuarioViewModel>))]
        [ProducesResponseType((int)HttpStatusCode.Forbidden, Type = typeof(ResponseForbidden))]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized, Type = typeof(ResponseUnauthorized))]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError, Type = typeof(ResponseInternalServerError))]
        public async Task<ActionResult<List<OrcamentoUsuarioViewModel>>> Search([FromQuery] int idOrcamento)
        {
            return Ok(await Mediator.Send(new SearchOrcamentoUsuarioQuery()
            {
                IdOrcamento = idOrcamento
            }));
        }

        [HttpPost]
        [Authorize]
        [ProducesResponseType((int)HttpStatusCode.OK, Type = typeof(OrcamentoUsuarioViewModel))]
        [ProducesResponseType((int)HttpStatusCode.Forbidden, Type = typeof(ResponseForbidden))]
        [ProducesResponseType((int)HttpStatusCode.BadRequest, Type = typeof(ResponseBadRequest))]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized, Type = typeof(ResponseUnauthorized))]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError, Type = typeof(ResponseInternalServerError))]
        public async Task<ActionResult<OrcamentoUsuarioViewModel>> Adicionar([FromBody]AdicionarOrcamentoUsuario model)
        {
            var command = Mapper.Map<AdicionarOrcamentoUsuarioCommand>(model);

            return Ok(await Mediator.Send(command));
        }

        [HttpPut("{id}")]
        [Authorize]
        [ProducesResponseType((int)HttpStatusCode.OK, Type = typeof(OrcamentoUsuarioViewModel))]
        [ProducesResponseType((int)HttpStatusCode.Forbidden, Type = typeof(ResponseForbidden))]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized, Type = typeof(ResponseUnauthorized))]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError, Type = typeof(ResponseInternalServerError))]
        public async Task<ActionResult<OrcamentoUsuarioViewModel>> Editar(int id, [FromBody]EditarOrcamentoUsuario model)
        {
            var command = Mapper.Map<EditarOrcamentoUsuarioCommand>(model);
            command.Id = id;

            return Ok(await Mediator.Send(command));
        }

        [HttpDelete("{id}")]
        [Authorize]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden, Type = typeof(ResponseForbidden))]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized, Type = typeof(ResponseUnauthorized))]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError, Type = typeof(ResponseInternalServerError))]
        public async Task<IActionResult> Excluir(int id)
        {
            var command = new ExcluirOrcamentoUsuarioCommand() { Id = id };

            return Ok(await Mediator.Send(command));
        }

        [HttpGet]
        [Route("BuscarUsuarios")]
        [Authorize]
        [ProducesResponseType((int)HttpStatusCode.OK, Type = typeof(List<UsuarioViewModel>))]
        [ProducesResponseType((int)HttpStatusCode.Forbidden, Type = typeof(ResponseForbidden))]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized, Type = typeof(ResponseUnauthorized))]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError, Type = typeof(ResponseInternalServerError))]
        public async Task<ActionResult<List<UsuarioViewModel>>> SearchUsuarios([FromQuery] int idOrcamento, [FromQuery]string termo)
        {
            return Ok(await Mediator.Send(new SearchUsuarioOrcamentoUsuarioQuery()
            {
                IdOrcamento = idOrcamento,
                Termo = termo
            }));
        }
    }
}
