using CalculadorOrcamento.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CalculadorOrcamento.Persistence
{
    public class CalculadorOrcamentoContext : DbContext
    {
        public CalculadorOrcamentoContext(DbContextOptions<CalculadorOrcamentoContext> options)
            : base(options)
        {
        }

        #region [Entidades]

        public DbSet<Orcamento> Orcamentos { get; set; }

        #endregion

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(CalculadorOrcamentoContext).Assembly);
        }
    }
}
