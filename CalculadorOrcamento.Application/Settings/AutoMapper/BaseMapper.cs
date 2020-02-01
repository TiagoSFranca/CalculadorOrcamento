using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace CalculadorOrcamento.Application.Settings.AutoMapper
{
    public abstract class BaseMapper
    {
        public BaseMapper(Profile profile)
        {
            Map(profile);
        }

        protected abstract void Map(Profile profile);
    }
}
