using System;
using System.Collections.Generic;
using System.Text;

namespace CalculadorOrcamento.Persistence
{
    public class CalculadorOrcamentoInitializer
    {
        public static void Initialize(CalculadorOrcamentoContext context)
        {
            var instance = new CalculadorOrcamentoInitializer();
            instance.Seed(context);
        }

        private void Seed(CalculadorOrcamentoContext context)
        {
            //SeedGeneroPet(context);
            //SeedSituacaoSolicitacaoPet(context);
        }

        //private void SeedSituacaoSolicitacaoPet(CalculadorOrcamentoContext context)
        //{
        //    if (context.SituacoesSolicitacaoPet.Any())
        //        return;
        //    context.SituacoesSolicitacaoPet.AddRange(SituacaoSolicitacaoPetSeed.Seeds);
        //    context.SaveChanges();
        //}

        //private void SeedGeneroPet(CalculadorOrcamentoContext context)
        //{
        //    if (context.GenerosPet.Any())
        //        return;
        //    context.GenerosPet.AddRange(GeneroPetSeed.Seeds);
        //    context.SaveChanges();
        //}
    }
}
