using AutoMapper;
using CalculadorOrcamento.Application.OrcamentoUsuarioPermissoes.Models;
using CalculadorOrcamento.Application.Settings.AutoMapper;
using CalculadorOrcamento.Domain.Entities;

namespace CalculadorOrcamento.Application.OrcamentoUsuarioPermissoes
{
    public class OrcamentoUsuarioPermissoesMapper : BaseMapper
    {
        public OrcamentoUsuarioPermissoesMapper(Profile profile) : base(profile)
        {
        }

        protected override void Map(Profile profile)
        {
            profile.CreateMap<OrcamentoUsuarioPermissao, OrcamentoUsuarioPermissaoViewModel>();
        }
    }
}
