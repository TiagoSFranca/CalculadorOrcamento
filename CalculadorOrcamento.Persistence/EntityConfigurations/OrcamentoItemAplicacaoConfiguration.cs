using CalculadorOrcamento.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CalculadorOrcamento.Persistence.EntityConfigurations
{
    public class OrcamentoItemAplicacaoConfiguration : IEntityTypeConfiguration<OrcamentoItemAplicacao>
    {
        public void Configure(EntityTypeBuilder<OrcamentoItemAplicacao> builder)
        {
            builder.ToTable(nameof(OrcamentoItemAplicacao));

            builder.HasKey(e => e.Id);

            builder.Property(e => e.Id)
                .ValueGeneratedOnAdd();

            builder.Property(e => e.Descricao)
                .HasMaxLength(512);

            builder.Property(e => e.Observacao)
                .HasMaxLength(1024);

            builder.Property(e => e.Nome)
                .IsRequired()
                .HasMaxLength(128);

            builder.Property(e => e.DuracaoBack);

            builder.Property(e => e.DuracaoFront);

            builder.Property(e => e.DuracaoTotal);

            builder.HasOne(e => e.Orcamento)
                .WithMany(f => f.OrcamentoItemAplicacoes)
                .HasForeignKey(e => e.IdOrcamento)
                .OnDelete(DeleteBehavior.Cascade);

        }
    }
}
