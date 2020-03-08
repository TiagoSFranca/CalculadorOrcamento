using CalculadorOrcamento.Domain.Entities;
using CalculadorOrcamento.Domain.Entities.GenericModels;
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

        public virtual DbSet<Orcamento> Orcamentos { get; set; }
        public virtual DbSet<OrcamentoItemAplicacao> OrcamentoItemAplicacoes { get; set; }
        public virtual DbSet<OrcamentoValor> OrcamentoValores { get; set; }
        public virtual DbSet<Usuario> Usuarios { get; set; }
        public virtual DbSet<RefreshToken> RefreshTokens { get; set; }
        public virtual DbSet<OrcamentoPermissao> OrcamentoPermissoes { get; set; }
        public virtual DbSet<OrcamentoUsuario> OrcamentoUsuarios { get; set; }
        public virtual DbSet<OrcamentoUsuarioPermissao> OrcamentoUsuarioPermissoes { get; set; }

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
