using AutoMapper;
using CalculadorOrcamento.Application.Settings.AutoMapper;
using CalculadorOrcamento.Application.Usuarios.Commands.Adicionar;
using CalculadorOrcamento.Application.Usuarios.Commands.Autenticar;
using CalculadorOrcamento.Application.Usuarios.Models;
using CalculadorOrcamento.Domain.Entities;

namespace CalculadorOrcamento.Application.Usuarios
{
    public class UsuariosMapper : BaseMapper
    {
        public UsuariosMapper(Profile profile)
            : base(profile)
        {
        }

        protected override void Map(Profile profile)
        {
            profile.CreateMap<Usuario, UsuarioViewModel>();

            profile.CreateMap<AdicionarUsuario, AdicionarUsuarioCommand>();
            profile.CreateMap<AdicionarUsuarioCommand, Usuario>()
                .ForMember(src => src.Senha, dest => dest.Ignore());

            profile.CreateMap<AutenticarUsuario, AutenticarUsuarioCommand>();
            profile.CreateMap<Usuario, UsuarioAutenticadoViewModel>();

            profile.CreateMap<RefreshToken, RefreshTokenViewModel>()
                .ReverseMap();
        }
    }
}
