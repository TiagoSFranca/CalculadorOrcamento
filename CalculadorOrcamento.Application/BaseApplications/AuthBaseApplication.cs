using CalculadorOrcamento.Application.Exceptions;
using CalculadorOrcamento.Application.Interfaces.BaseApplications;
using CalculadorOrcamento.Common.Helpers;
using CalculadorOrcamento.Persistence;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace CalculadorOrcamento.Application.BaseApplications
{
    public class AuthBaseApplication : IAuthBaseApplication
    {
        private readonly IHttpContextAccessor _accessor;
        private readonly CalculadorOrcamentoContext _context;

        public AuthBaseApplication(IHttpContextAccessor accessor, CalculadorOrcamentoContext context)
        {
            _accessor = accessor;
            _context = context;
        }

        private AuthorizationException _unauth => new AuthorizationException();

        private int? _id => ConvertHelper.ConvertStringToNullableInt(GetClaims(ClaimTypes.Sid).FirstOrDefault()?.Value);

        public void CheckIsAuth()
        {
            GetId();
        }

        public int GetId()
        {
            if (_id == null)
                throw _unauth;

            var id = (int)_id;

            if (!_context.Usuarios.Any(e => e.Id == id))
                throw _unauth;

            return id;
        }

        #region [ Métodos Auxiliares ]

        private IEnumerable<Claim> GetClaimsIdentity()
        {
            return _accessor.HttpContext.User.Claims;
        }

        private IEnumerable<Claim> GetClaims(string claimType)
        {
            return GetClaimsIdentity().Where(e => e.Type.ToLower().Equals(claimType.ToLower())).ToList();
        }

        #endregion
    }
}
