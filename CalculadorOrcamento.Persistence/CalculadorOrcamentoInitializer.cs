using System.Linq;
using CalculadorOrcamento.Domain.Seeds;

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
            SeedOrcamentoPermissao(context);
        }

        private void SeedOrcamentoPermissao(CalculadorOrcamentoContext context)
        {
            if (context.OrcamentoPermissoes.Any())
                return;

            context.OrcamentoPermissoes.AddRange(OrcamentoPermissaoSeed.Seeds);
            context.SaveChanges();
        }
    }
}
