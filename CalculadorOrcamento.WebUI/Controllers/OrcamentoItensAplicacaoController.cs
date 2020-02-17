﻿using CalculadorOrcamento.Application.Exceptions;
using CalculadorOrcamento.Application.OrcamentoItensAplicacao.Commands.Adicionar;
using CalculadorOrcamento.Application.OrcamentoItensAplicacao.Models;
using CalculadorOrcamento.Application.OrcamentoItensAplicacao.Queries.Search;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace CalculadorOrcamento.WebUI.Controllers
{
    public class OrcamentoItensAplicacaoController : BaseController
    {
        [HttpGet]
        [ProducesResponseType((int)HttpStatusCode.OK, Type = typeof(List<OrcamentoItemAplicacaoViewModel>))]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError, Type = typeof(ResponseInternalServerError))]
        public async Task<ActionResult<List<OrcamentoItemAplicacaoViewModel>>> Search([FromQuery] int idOrcamento)
        {
            return Ok(await Mediator.Send(new SearchOrcamentoItemAplicacaoQuery()
            {
                IdOrcamento = idOrcamento
            }));
        }

        [HttpPost]
        //[Authorize]
        [ProducesResponseType((int)HttpStatusCode.OK, Type = typeof(OrcamentoItemAplicacaoViewModel))]
        [ProducesResponseType((int)HttpStatusCode.BadRequest, Type = typeof(ResponseBadRequest))]
        //[ProducesResponseType((int)HttpStatusCode.Unauthorized, Type = typeof(ResponseUnauthorized))]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError, Type = typeof(ResponseInternalServerError))]
        public async Task<ActionResult<OrcamentoItemAplicacaoViewModel>> Adicionar([FromBody]AdicionarOrcamentoItemAplicacao model)
        {
            var command = Mapper.Map<AdicionarOrcamentoItemAplicacaoCommand>(model);

            return Ok(await Mediator.Send(command));
        }
    }
}
