using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CalculadorOrcamento.Persistence.Migrations
{
    public partial class Create_Orcamento_Table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Orcamento",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Codigo = table.Column<Guid>(nullable: false),
                    Nome = table.Column<string>(maxLength: 128, nullable: false),
                    Descricao = table.Column<string>(maxLength: 512, nullable: true),
                    DataCriacao = table.Column<DateTime>(nullable: false),
                    DataAtualizacao = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orcamento", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Orcamento");
        }
    }
}
