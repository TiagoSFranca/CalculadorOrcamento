﻿using System;

namespace CalculadorOrcamento.Application.Exceptions
{
    public class PersistenceException : Exception
    {
        public PersistenceException(Exception exception)
            : base("Ocorreu um ou mais erros ao persistir os dados.", exception)
        { }
    }
}
