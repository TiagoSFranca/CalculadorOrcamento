using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CalculadorOrcamento.Persistence.Migrations
{
    public partial class Create_Usuario_Table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Usuario",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DataCriacao = table.Column<DateTime>(nullable: false),
                    DataAtualizacao = table.Column<DateTime>(nullable: false),
                    Codigo = table.Column<Guid>(nullable: false),
                    Nome = table.Column<string>(maxLength: 64, nullable: false),
                    Sobrenome = table.Column<string>(maxLength: 256, nullable: false),
                    Email = table.Column<string>(maxLength: 256, nullable: false),
                    Login = table.Column<string>(maxLength: 64, nullable: false),
                    Senha = table.Column<string>(maxLength: 256, nullable: false),
                    ConfirmouEmail = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuario", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Usuario");
        }
    }
}
