using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CalculadorOrcamento.Persistence.Migrations
{
    public partial class Create_OrcamentoItemAplicacao_Table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "OrcamentoItemAplicacao",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdOrcamento = table.Column<int>(nullable: false),
                    Nome = table.Column<string>(maxLength: 128, nullable: false),
                    Descricao = table.Column<string>(maxLength: 512, nullable: true),
                    Observacao = table.Column<string>(maxLength: 1024, nullable: true),
                    DataCriacao = table.Column<DateTime>(nullable: false),
                    DataAtualizacao = table.Column<DateTime>(nullable: false),
                    DuracaoFront = table.Column<decimal>(nullable: true),
                    DuracaoBack = table.Column<decimal>(nullable: true),
                    DuracaoTotal = table.Column<decimal>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrcamentoItemAplicacao", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrcamentoItemAplicacao_Orcamento_IdOrcamento",
                        column: x => x.IdOrcamento,
                        principalTable: "Orcamento",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrcamentoItemAplicacao_IdOrcamento",
                table: "OrcamentoItemAplicacao",
                column: "IdOrcamento");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrcamentoItemAplicacao");
        }
    }
}
