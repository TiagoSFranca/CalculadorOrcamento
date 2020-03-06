using AutoMapper;
using CalculadorOrcamento.Application.OrcamentoPermissoes.Models;
using CalculadorOrcamento.Application.Settings.AutoMapper;
using CalculadorOrcamento.Domain.Entities;

namespace CalculadorOrcamento.Application.OrcamentoPermissoes
{
    public class OrcamentoPermissoesMapper : BaseMapper
    {
        public OrcamentoPermissoesMapper(Profile profile) : base(profile)
        {
        }

        protected override void Map(Profile profile)
        {
            profile.CreateMap<OrcamentoPermissao, OrcamentoPermissaoViewModel>();
        }
    }
}
