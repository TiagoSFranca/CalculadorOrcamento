using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CalculadorOrcamento.Persistence.Migrations
{
    public partial class Create_OrcamentoUsuario_AND_OrcamentoUsuarioPermissao_Tables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "OrcamentoUsuario",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DataCriacao = table.Column<DateTime>(nullable: false),
                    DataAtualizacao = table.Column<DateTime>(nullable: false),
                    IdOrcamento = table.Column<int>(nullable: false),
                    IdUsuario = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrcamentoUsuario", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrcamentoUsuario_Orcamento_IdOrcamento",
                        column: x => x.IdOrcamento,
                        principalTable: "Orcamento",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrcamentoUsuario_Usuario_IdUsuario",
                        column: x => x.IdUsuario,
                        principalTable: "Usuario",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "OrcamentoUsuarioPermissao",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DataCriacao = table.Column<DateTime>(nullable: false),
                    DataAtualizacao = table.Column<DateTime>(nullable: false),
                    IdOrcamentoUsuario = table.Column<int>(nullable: false),
                    IdPermissao = table.Column<int>(nullable: false),
                    Permite = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrcamentoUsuarioPermissao", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrcamentoUsuarioPermissao_OrcamentoUsuario_IdOrcamentoUsuario",
                        column: x => x.IdOrcamentoUsuario,
                        principalTable: "OrcamentoUsuario",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrcamentoUsuarioPermissao_OrcamentoPermissao_IdPermissao",
                        column: x => x.IdPermissao,
                        principalTable: "OrcamentoPermissao",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrcamentoUsuario_IdOrcamento",
                table: "OrcamentoUsuario",
                column: "IdOrcamento");

            migrationBuilder.CreateIndex(
                name: "IX_OrcamentoUsuario_IdUsuario",
                table: "OrcamentoUsuario",
                column: "IdUsuario");

            migrationBuilder.CreateIndex(
                name: "IX_OrcamentoUsuarioPermissao_IdOrcamentoUsuario",
                table: "OrcamentoUsuarioPermissao",
                column: "IdOrcamentoUsuario");

            migrationBuilder.CreateIndex(
                name: "IX_OrcamentoUsuarioPermissao_IdPermissao",
                table: "OrcamentoUsuarioPermissao",
                column: "IdPermissao");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrcamentoUsuarioPermissao");

            migrationBuilder.DropTable(
                name: "OrcamentoUsuario");
        }
    }
}
