using Microsoft.EntityFrameworkCore.Migrations;

namespace CalculadorOrcamento.Persistence.Migrations
{
    public partial class Update_RefreshToken_Table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_RefreshToken_IdUsuario",
                table: "RefreshToken",
                column: "IdUsuario");

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
                name: "FK_RefreshToken_Usuario_IdUsuario",
                table: "RefreshToken");

            migrationBuilder.DropIndex(
                name: "IX_RefreshToken_IdUsuario",
                table: "RefreshToken");
        }
    }
}
