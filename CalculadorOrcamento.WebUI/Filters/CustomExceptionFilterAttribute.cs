﻿using CalculadorOrcamento.Application.Exceptions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Net;

namespace CalculadorOrcamento.WebUI.Filters
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class CustomExceptionFilterAttribute : ExceptionFilterAttribute
    {
        private void MontarResponse(ref ExceptionContext context, int status, ResponseError objeto)
        {
            context.HttpContext.Response.ContentType = "application/json";
            context.HttpContext.Response.StatusCode = status;

            context.Result = new JsonResult(objeto);
        }

        private void MontarNotFound(ref ExceptionContext context)
        {
            var objeto = new ResponseNotFound(context.Exception);
            MontarResponse(ref context, (int)HttpStatusCode.NotFound, objeto);
        }

        private void MontarBadRequest(ref ExceptionContext context)
        {
            var objeto = new ResponseBadRequest(context.Exception);
            MontarResponse(ref context, (int)HttpStatusCode.BadRequest, objeto);
        }

        private void MontarInternalServerError(ref ExceptionContext context)
        {
            var objeto = new ResponseInternalServerError(context.Exception);
            MontarResponse(ref context, (int)HttpStatusCode.InternalServerError, objeto);
        }

        private void MontarUnauthorized(ref ExceptionContext context)
        {
            var objeto = new ResponseUnauthorized(context.Exception);
            MontarResponse(ref context, (int)HttpStatusCode.Unauthorized, objeto);
        }

        private void MontarForbidden(ref ExceptionContext context)
        {
            var objeto = new ResponseForbidden(context.Exception);
            MontarResponse(ref context, (int)HttpStatusCode.Forbidden, objeto);
        }

        public override void OnException(ExceptionContext context)
        {
            if (context.Exception is ValidationException || context.Exception is BusinessException)
            {
                MontarBadRequest(ref context);
            }
            else if (context.Exception is NotFoundException)
            {
                MontarNotFound(ref context);
            }
            else if (context.Exception is AuthorizationException)
            {
                MontarUnauthorized(ref context);
            }
            else if (context.Exception is PersistenceException)
            {
                MontarInternalServerError(ref context);
            }
            else if(context.Exception is ForbiddenException)
            {
                MontarForbidden(ref context);
            }
            else
            {
                MontarInternalServerError(ref context);
            }

        }
    }

}
