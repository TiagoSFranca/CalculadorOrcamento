using CalculadorOrcamento.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CalculadorOrcamento.Persistence.EntityConfigurations
{
    public class OrcamentoValorConfiguration : IEntityTypeConfiguration<OrcamentoValor>
    {
        public void Configure(EntityTypeBuilder<OrcamentoValor> builder)
        {
            builder.ToTable(nameof(OrcamentoValor));

            builder.HasKey(e => e.Id);

            builder.Property(e => e.Id)
                .ValueGeneratedOnAdd();

            builder.HasOne(e => e.Orcamento)
                .WithMany(f => f.OrcamentoValores)
                .HasForeignKey(e => e.IdOrcamento)
                .OnDelete(DeleteBehavior.Cascade);

        }
    }
}
