using CalculadorOrcamento.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CalculadorOrcamento.Persistence.EntityConfigurations
{
    public class OrcamentoUsuarioPermissaoConfiguration : IEntityTypeConfiguration<OrcamentoUsuarioPermissao>
    {
        public void Configure(EntityTypeBuilder<OrcamentoUsuarioPermissao> builder)
        {
            builder.ToTable(nameof(OrcamentoUsuarioPermissao));

            builder.HasKey(e => e.Id);

            builder.Property(e => e.Id)
                .ValueGeneratedOnAdd();

            builder.HasOne(e => e.OrcamentoUsuario)
                .WithMany(f => f.OrcamentoUsuarioPermissoes)
                .HasForeignKey(e => e.IdOrcamentoUsuario)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(e => e.Permissao)
                .WithMany(f => f.OrcamentoUsuarioPermissoes)
                .HasForeignKey(e => e.IdPermissao)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
