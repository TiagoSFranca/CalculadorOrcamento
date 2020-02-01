using CalculadorOrcamento.Persistence.Settings;
using Microsoft.EntityFrameworkCore;

namespace CalculadorOrcamento.Persistence
{
    public class CalculadorOrcamentoContextFactory : DesignTimeDbContextFactoryBase<CalculadorOrcamentoContext>
    {
        protected override CalculadorOrcamentoContext CreateNewInstance(DbContextOptions<CalculadorOrcamentoContext> options)
        {
            return new CalculadorOrcamentoContext(options);
        }
    }
}
