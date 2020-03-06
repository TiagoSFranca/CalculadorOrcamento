using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using CalculadorOrcamento.Application.Exceptions;
using CalculadorOrcamento.Application.OrcamentoPermissoes.Models;
using CalculadorOrcamento.Application.OrcamentoPermissoes.Queries.List;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CalculadorOrcamento.WebUI.Controllers
{
    public class OrcamentoPermissoesController : BaseController
    {
        [HttpGet]
        [Authorize]
        [ProducesResponseType((int)HttpStatusCode.OK, Type = typeof(List<OrcamentoPermissaoViewModel>))]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized, Type = typeof(ResponseUnauthorized))]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError, Type = typeof(ResponseInternalServerError))]
        public async Task<ActionResult<List<OrcamentoPermissaoViewModel>>> List()
        {
            return Ok(await Mediator.Send(new ListOrcamentoPermissaoQuery()));
        }

    }
}
