using AutoMapper;
using CalculadorOrcamento.Application.OrcamentoUsuarios.Commands.Adicionar;
using CalculadorOrcamento.Application.OrcamentoUsuarios.Commands.Editar;
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

            profile.CreateMap<AdicionarOrcamentoUsuario, AdicionarOrcamentoUsuarioCommand>();

            profile.CreateMap<EditarOrcamentoUsuario, EditarOrcamentoUsuarioCommand>();

            profile.CreateMap<AdicionarOrcamentoUsuarioCommand, OrcamentoUsuario>();
        }
    }
}
