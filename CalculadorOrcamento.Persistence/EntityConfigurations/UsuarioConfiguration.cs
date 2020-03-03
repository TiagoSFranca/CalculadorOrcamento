using CalculadorOrcamento.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CalculadorOrcamento.Persistence.EntityConfigurations
{
    public class UsuarioConfiguration : IEntityTypeConfiguration<Usuario>
    {
        public void Configure(EntityTypeBuilder<Usuario> builder)
        {
            builder.ToTable(nameof(Usuario));

            builder.HasKey(e => e.Id);

            builder.Property(e => e.Id)
                .ValueGeneratedOnAdd();

            builder.Property(e => e.Codigo)
                .IsRequired();

            builder.Property(e => e.Nome)
                .IsRequired()
                .HasMaxLength(64);

            builder.Property(e => e.Sobrenome)
                .IsRequired()
                .HasMaxLength(256);

            builder.Property(e => e.Email)
                .IsRequired()
                .HasMaxLength(256);

            builder.Property(e => e.Login)
                .IsRequired()
                .HasMaxLength(64);

            builder.Property(e => e.Senha)
                .IsRequired()
                .HasMaxLength(256);
        }
    }
}
