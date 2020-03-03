using CalculadorOrcamento.Application.Exceptions;
using CalculadorOrcamento.Application.Usuarios.Commands.Adicionar;
using CalculadorOrcamento.Application.Usuarios.Commands.Autenticar;
using CalculadorOrcamento.Application.Usuarios.Commands.RefreshToken;
using CalculadorOrcamento.Application.Usuarios.Models;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Threading.Tasks;

namespace CalculadorOrcamento.WebUI.Controllers
{
    public class AuthController : BaseController
    {
        [HttpPost]
        [Route("Register")]
        [ProducesResponseType((int)HttpStatusCode.OK, Type = typeof(UsuarioViewModel))]
        [ProducesResponseType((int)HttpStatusCode.BadRequest, Type = typeof(ResponseBadRequest))]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError, Type = typeof(ResponseInternalServerError))]
        public async Task<ActionResult<UsuarioViewModel>> Adicionar([FromBody]AdicionarUsuario model)
        {
            var command = Mapper.Map<AdicionarUsuarioCommand>(model);

            return Ok(await Mediator.Send(command));
        }

        [HttpPost]
        [Route("login")]
        [ProducesResponseType((int)HttpStatusCode.OK, Type = typeof(UsuarioAutenticadoViewModel))]
        [ProducesResponseType((int)HttpStatusCode.BadRequest, Type = typeof(ResponseBadRequest))]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError, Type = typeof(ResponseInternalServerError))]
        public async Task<ActionResult<UsuarioAutenticadoViewModel>> Autenticar([FromBody]AutenticarUsuario model)
        {
            var command = Mapper.Map<AutenticarUsuarioCommand>(model);

            return Ok(await Mediator.Send(command));
        }

        [HttpPost]
        [Route("refresh")]
        [ProducesResponseType((int)HttpStatusCode.OK, Type = typeof(UsuarioAutenticadoViewModel))]
        [ProducesResponseType((int)HttpStatusCode.BadRequest, Type = typeof(ResponseBadRequest))]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError, Type = typeof(ResponseInternalServerError))]
        public async Task<ActionResult<UsuarioAutenticadoViewModel>> RefreshToken([FromBody]RefreshTokenUsuario model)
        {
            var command = Mapper.Map<RefreshTokenUsuarioCommand>(model);

            return Ok(await Mediator.Send(command));
        }
    }
}
