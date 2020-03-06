using AutoMapper;
using CalculadorOrcamento.Application.OrcamentoUsuarios.Models;
using CalculadorOrcamento.Application.Settings.AutoMapper;
using CalculadorOrcamento.Domain.Entities;

namespace CalculadorOrcamento.Application.OrcamentoUsuarios
{
    public class OrcamentoUsuariosMapper : BaseMapper
    {
        public OrcamentoUsuariosMapper(Profile profile) : base(profile)
        {
        }

        protected override void Map(Profile profile)
        {
            profile.CreateMap<OrcamentoUsuario, OrcamentoUsuarioViewModel>();
        }
    }
}
