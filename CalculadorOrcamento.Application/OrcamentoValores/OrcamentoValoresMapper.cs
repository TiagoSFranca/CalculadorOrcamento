using AutoMapper;
using CalculadorOrcamento.Application.OrcamentoValores.Commands.Adicionar;
using CalculadorOrcamento.Application.OrcamentoValores.Models;
using CalculadorOrcamento.Application.Settings.AutoMapper;
using CalculadorOrcamento.Domain.Entities;

namespace CalculadorOrcamento.Application.OrcamentoValores
{
    public class OrcamentoValoresMapper : BaseMapper
    {
        public OrcamentoValoresMapper(Profile profile)
            : base(profile)
        {
        }

        protected override void Map(Profile profile)
        {
            profile.CreateMap<OrcamentoValor, OrcamentoValorViewModel>();

            profile.CreateMap<AdicionarOrcamentoValor, AdicionarOrcamentoValorCommand>();
            profile.CreateMap<AdicionarOrcamentoValorCommand, OrcamentoValor>();
        }
    }
}
