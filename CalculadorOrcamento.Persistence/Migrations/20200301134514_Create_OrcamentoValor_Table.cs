using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CalculadorOrcamento.Persistence.Migrations
{
    public partial class Create_OrcamentoValor_Table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "OrcamentoValor",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DataCriacao = table.Column<DateTime>(nullable: false),
                    DataAtualizacao = table.Column<DateTime>(nullable: false),
                    IdOrcamento = table.Column<int>(nullable: false),
                    ValorHora = table.Column<decimal>(nullable: false),
                    Multiplicador = table.Column<decimal>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrcamentoValor", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrcamentoValor_Orcamento_IdOrcamento",
                        column: x => x.IdOrcamento,
                        principalTable: "Orcamento",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrcamentoValor_IdOrcamento",
                table: "OrcamentoValor",
                column: "IdOrcamento");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrcamentoValor");
        }
    }
}
