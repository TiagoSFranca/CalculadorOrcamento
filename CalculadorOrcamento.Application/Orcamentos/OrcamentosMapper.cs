using AutoMapper;
using CalculadorOrcamento.Application.Orcamentos.Models;
using CalculadorOrcamento.Application.Settings.AutoMapper;
using CalculadorOrcamento.Domain.Entities;

namespace CalculadorOrcamento.Application.Orcamentos
{
    public class OrcamentosMapper : BaseMapper
    {
        public OrcamentosMapper(Profile profile)
            : base(profile)
        {
        }

        protected override void Map(Profile profile)
        {
            profile.CreateMap<Orcamento, OrcamentoViewModel>();
        }
    }
}
