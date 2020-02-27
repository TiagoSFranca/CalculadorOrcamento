using AutoMapper;
using CalculadorOrcamento.Application.Orcamentos.Commands.Adicionar;
using CalculadorOrcamento.Application.Orcamentos.Commands.Editar;
using CalculadorOrcamento.Application.Orcamentos.Commands.Excluir;
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

            profile.CreateMap<AdicionarOrcamento, AdicionarOrcamentoCommand>();
            profile.CreateMap<AdicionarOrcamentoCommand, Orcamento>();

            profile.CreateMap<EditarOrcamento, EditarOrcamentoCommand>();
            profile.CreateMap<EditarOrcamentoCommand, Orcamento>();

            profile.CreateMap<ExcluirOrcamentos, ExcluirOrcamentosCommand>();
        }
    }
}
