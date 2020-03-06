﻿// <auto-generated />
using System;
using CalculadorOrcamento.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace CalculadorOrcamento.Persistence.Migrations
{
    [DbContext(typeof(CalculadorOrcamentoContext))]
    [Migration("20200306174552_Create_OrcamentoUsuario_AND_OrcamentoUsuarioPermissao_Tables")]
    partial class Create_OrcamentoUsuario_AND_OrcamentoUsuarioPermissao_Tables
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("CalculadorOrcamento.Domain.Entities.Orcamento", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<Guid>("Codigo")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("DataAtualizacao")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DataCriacao")
                        .HasColumnType("datetime2");

                    b.Property<string>("Descricao")
                        .HasColumnType("nvarchar(512)")
                        .HasMaxLength(512);

                    b.Property<int>("IdUsuario")
                        .HasColumnType("int");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("nvarchar(128)")
                        .HasMaxLength(128);

                    b.HasKey("Id");

                    b.HasIndex("IdUsuario");

                    b.ToTable("Orcamento");
                });

            modelBuilder.Entity("CalculadorOrcamento.Domain.Entities.OrcamentoItemAplicacao", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DataAtualizacao")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DataCriacao")
                        .HasColumnType("datetime2");

                    b.Property<string>("Descricao")
                        .HasColumnType("nvarchar(512)")
                        .HasMaxLength(512);

                    b.Property<decimal?>("DuracaoBack")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal?>("DuracaoFront")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal?>("DuracaoTotal")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("IdOrcamento")
                        .HasColumnType("int");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("nvarchar(128)")
                        .HasMaxLength(128);

                    b.Property<string>("Observacao")
                        .HasColumnType("nvarchar(1024)")
                        .HasMaxLength(1024);

                    b.HasKey("Id");

                    b.HasIndex("IdOrcamento");

                    b.ToTable("OrcamentoItemAplicacao");
                });

            modelBuilder.Entity("CalculadorOrcamento.Domain.Entities.OrcamentoPermissao", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("int");

                    b.Property<string>("Descricao")
                        .IsRequired()
                        .HasColumnType("nvarchar(128)")
                        .HasMaxLength(128);

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("nvarchar(64)")
                        .HasMaxLength(64);

                    b.HasKey("Id");

                    b.ToTable("OrcamentoPermissao");
                });

            modelBuilder.Entity("CalculadorOrcamento.Domain.Entities.OrcamentoUsuario", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DataAtualizacao")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DataCriacao")
                        .HasColumnType("datetime2");

                    b.Property<int>("IdOrcamento")
                        .HasColumnType("int");

                    b.Property<int>("IdUsuario")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("IdOrcamento");

                    b.HasIndex("IdUsuario");

                    b.ToTable("OrcamentoUsuario");
                });

            modelBuilder.Entity("CalculadorOrcamento.Domain.Entities.OrcamentoUsuarioPermissao", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DataAtualizacao")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DataCriacao")
                        .HasColumnType("datetime2");

                    b.Property<int>("IdOrcamentoUsuario")
                        .HasColumnType("int");

                    b.Property<int>("IdPermissao")
                        .HasColumnType("int");

                    b.Property<bool>("Permite")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.HasIndex("IdOrcamentoUsuario");

                    b.HasIndex("IdPermissao");

                    b.ToTable("OrcamentoUsuarioPermissao");
                });

            modelBuilder.Entity("CalculadorOrcamento.Domain.Entities.OrcamentoValor", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DataAtualizacao")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DataCriacao")
                        .HasColumnType("datetime2");

                    b.Property<int>("IdOrcamento")
                        .HasColumnType("int");

                    b.Property<decimal>("Multiplicador")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("ValorHora")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("Id");

                    b.HasIndex("IdOrcamento");

                    b.ToTable("OrcamentoValor");
                });

            modelBuilder.Entity("CalculadorOrcamento.Domain.Entities.RefreshToken", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DataAtualizacao")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DataCriacao")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DataExpiracao")
                        .HasColumnType("datetime2");

                    b.Property<int>("IdUsuario")
                        .HasColumnType("int");

                    b.Property<string>("Token")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("IdUsuario");

                    b.ToTable("RefreshToken");
                });

            modelBuilder.Entity("CalculadorOrcamento.Domain.Entities.Usuario", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<Guid>("Codigo")
                        .HasColumnType("uniqueidentifier");

                    b.Property<bool>("ConfirmouEmail")
                        .HasColumnType("bit");

                    b.Property<DateTime>("DataAtualizacao")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DataCriacao")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.Property<string>("Login")
                        .IsRequired()
                        .HasColumnType("nvarchar(64)")
                        .HasMaxLength(64);

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("nvarchar(64)")
                        .HasMaxLength(64);

                    b.Property<string>("Senha")
                        .IsRequired()
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.Property<string>("Sobrenome")
                        .IsRequired()
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.ToTable("Usuario");
                });

            modelBuilder.Entity("CalculadorOrcamento.Domain.Entities.Orcamento", b =>
                {
                    b.HasOne("CalculadorOrcamento.Domain.Entities.Usuario", "Usuario")
                        .WithMany("Orcamentos")
                        .HasForeignKey("IdUsuario")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("CalculadorOrcamento.Domain.Entities.OrcamentoItemAplicacao", b =>
                {
                    b.HasOne("CalculadorOrcamento.Domain.Entities.Orcamento", "Orcamento")
                        .WithMany("OrcamentoItemAplicacoes")
                        .HasForeignKey("IdOrcamento")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("CalculadorOrcamento.Domain.Entities.OrcamentoUsuario", b =>
                {
                    b.HasOne("CalculadorOrcamento.Domain.Entities.Orcamento", "Orcamento")
                        .WithMany("OrcamentoUsuarios")
                        .HasForeignKey("IdOrcamento")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CalculadorOrcamento.Domain.Entities.Usuario", "Usuario")
                        .WithMany("OrcamentoUsuarios")
                        .HasForeignKey("IdUsuario")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();
                });

            modelBuilder.Entity("CalculadorOrcamento.Domain.Entities.OrcamentoUsuarioPermissao", b =>
                {
                    b.HasOne("CalculadorOrcamento.Domain.Entities.OrcamentoUsuario", "OrcamentoUsuario")
                        .WithMany("OrcamentoUsuarioPermissoes")
                        .HasForeignKey("IdOrcamentoUsuario")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CalculadorOrcamento.Domain.Entities.OrcamentoPermissao", "Permissao")
                        .WithMany("OrcamentoUsuarioPermissoes")
                        .HasForeignKey("IdPermissao")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("CalculadorOrcamento.Domain.Entities.OrcamentoValor", b =>
                {
                    b.HasOne("CalculadorOrcamento.Domain.Entities.Orcamento", "Orcamento")
                        .WithMany("OrcamentoValores")
                        .HasForeignKey("IdOrcamento")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("CalculadorOrcamento.Domain.Entities.RefreshToken", b =>
                {
                    b.HasOne("CalculadorOrcamento.Domain.Entities.Usuario", "Usuario")
                        .WithMany()
                        .HasForeignKey("IdUsuario")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
