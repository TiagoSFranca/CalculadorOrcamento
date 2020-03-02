using CalculadorOrcamento.Domain.Entities;
using CalculadorOrcamento.Domain.Entities.Genericas;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

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
        public DbSet<OrcamentoItemAplicacao> OrcamentoItemAplicacoes { get; set; }
        public DbSet<OrcamentoValor> OrcamentoValores { get; set; }

        #endregion

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(CalculadorOrcamentoContext).Assembly);

        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            var entries = ChangeTracker
           .Entries()
           .Where(e => e.Entity is RegistroTempo && (
                   e.State == EntityState.Added
                   || e.State == EntityState.Modified));

            foreach (var entityEntry in entries)
            {
                ((RegistroTempo)entityEntry.Entity).DataAtualizacao = DateTime.Now;

                if (entityEntry.State == EntityState.Added)
                {
                    ((RegistroTempo)entityEntry.Entity).DataCriacao = DateTime.Now;
                }
            }

            return base.SaveChangesAsync(cancellationToken);
        }
    }
}
