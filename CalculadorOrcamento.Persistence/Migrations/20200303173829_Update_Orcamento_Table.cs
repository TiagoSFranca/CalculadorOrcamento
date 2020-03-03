using Microsoft.EntityFrameworkCore.Migrations;

namespace CalculadorOrcamento.Persistence.Migrations
{
    public partial class Update_Orcamento_Table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "IdUsuario",
                table: "Orcamento",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_RefreshToken_IdUsuario",
                table: "RefreshToken",
                column: "IdUsuario");

            migrationBuilder.CreateIndex(
                name: "IX_Orcamento_IdUsuario",
                table: "Orcamento",
                column: "IdUsuario");

            migrationBuilder.AddForeignKey(
                name: "FK_Orcamento_Usuario_IdUsuario",
                table: "Orcamento",
                column: "IdUsuario",
                principalTable: "Usuario",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RefreshToken_Usuario_IdUsuario",
                table: "RefreshToken",
                column: "IdUsuario",
                principalTable: "Usuario",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orcamento_Usuario_IdUsuario",
                table: "Orcamento");

            migrationBuilder.DropForeignKey(
                name: "FK_RefreshToken_Usuario_IdUsuario",
                table: "RefreshToken");

            migrationBuilder.DropIndex(
                name: "IX_RefreshToken_IdUsuario",
                table: "RefreshToken");

            migrationBuilder.DropIndex(
                name: "IX_Orcamento_IdUsuario",
                table: "Orcamento");

            migrationBuilder.DropColumn(
                name: "IdUsuario",
                table: "Orcamento");
        }
    }
}
