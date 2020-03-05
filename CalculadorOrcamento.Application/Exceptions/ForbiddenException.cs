using System;

namespace CalculadorOrcamento.Application.Exceptions
{
    public class ForbiddenException : Exception
    {
        public ForbiddenException()
            : base("Permissão não concedida.")
        { }

        public ForbiddenException(string message)
            : base(message)
        { }
    }
}
