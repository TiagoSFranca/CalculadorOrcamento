using CalculadorOrcamento.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CalculadorOrcamento.Persistence.EntityConfigurations
{
    public class OrcamentoUsuarioConfiguration : IEntityTypeConfiguration<OrcamentoUsuario>
    {
        public void Configure(EntityTypeBuilder<OrcamentoUsuario> builder)
        {
            builder.ToTable(nameof(OrcamentoUsuario));

            builder.HasKey(e => e.Id);

            builder.Property(e => e.Id)
                .ValueGeneratedOnAdd();

            builder.HasOne(e => e.Orcamento)
                .WithMany(f => f.OrcamentoUsuarios)
                .HasForeignKey(e => e.IdOrcamento)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(e => e.Usuario)
                .WithMany(f => f.OrcamentoUsuarios)
                .HasForeignKey(e => e.IdUsuario)
                .OnDelete(DeleteBehavior.Restrict);

        }
    }
}
