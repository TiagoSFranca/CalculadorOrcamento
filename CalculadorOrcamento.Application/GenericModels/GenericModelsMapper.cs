using AutoMapper;
using CalculadorOrcamento.Application.Settings.AutoMapper;
using CalculadorOrcamento.Domain.Entities.GenericModels;

namespace CalculadorOrcamento.Application.GenericModels
{
    public class GenericModelsMapper : BaseMapper
    {
        public GenericModelsMapper(Profile profile) : base(profile)
        {
        }

        protected override void Map(Profile profile)
        {
            profile.CreateMap<RegistroTempo, RegistroTempoViewModel>();
        }
    }
}
