using CalculadorOrcamento.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CalculadorOrcamento.Persistence.EntityConfigurations
{
    public class OrcamentoPermissaoConfiguration : IEntityTypeConfiguration<OrcamentoPermissao>
    {
        public void Configure(EntityTypeBuilder<OrcamentoPermissao> builder)
        {
            builder.ToTable(nameof(OrcamentoPermissao));

            builder.HasKey(e => e.Id);

            builder.Property(e => e.Id)
                .ValueGeneratedNever();

            builder.Property(e => e.Nome)
                .IsRequired()
                .HasMaxLength(64);

            builder.Property(e => e.Descricao)
                .IsRequired()
                .HasMaxLength(128);

        }
    }
}
