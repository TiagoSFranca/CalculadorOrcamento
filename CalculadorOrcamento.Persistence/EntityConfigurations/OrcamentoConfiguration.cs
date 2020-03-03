﻿using CalculadorOrcamento.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CalculadorOrcamento.Persistence.EntityConfigurations
{
    public class OrcamentoConfiguration : IEntityTypeConfiguration<Orcamento>
    {
        public void Configure(EntityTypeBuilder<Orcamento> builder)
        {
            builder.ToTable(nameof(Orcamento));

            builder.HasKey(e => e.Id);

            builder.Property(e => e.Id)
                .ValueGeneratedOnAdd();

            builder.Property(e => e.Codigo)
                .IsRequired();

            builder.Property(e => e.Descricao)
                .HasMaxLength(512);

            builder.Property(e => e.Nome)
                .IsRequired()
                .HasMaxLength(128);

            builder.HasOne(e => e.Usuario)
                .WithMany(f => f.Orcamentos)
                .HasForeignKey(e => e.IdUsuario)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
