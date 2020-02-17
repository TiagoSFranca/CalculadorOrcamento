using AutoMapper;
using CalculadorOrcamento.Application.OrcamentoItensAplicacao.Commands.Adicionar;
using CalculadorOrcamento.Application.OrcamentoItensAplicacao.Models;
using CalculadorOrcamento.Application.Settings.AutoMapper;
using CalculadorOrcamento.Domain.Entities;

namespace CalculadorOrcamento.Application.OrcamentoItensAplicacao
{
    public class OrcamentoItemAplicacaoMapper : BaseMapper
    {
        public OrcamentoItemAplicacaoMapper(Profile profile) 
            : base(profile)
        {
        }

        protected override void Map(Profile profile)
        {
            profile.CreateMap<OrcamentoItemAplicacao, OrcamentoItemAplicacaoViewModel>();

            profile.CreateMap<AdicionarOrcamentoItemAplicacao, AdicionarOrcamentoItemAplicacaoCommand>();
            profile.CreateMap<AdicionarOrcamentoItemAplicacaoCommand, OrcamentoItemAplicacao>();
        }
    }
}
