using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Jokes.Data.Migrations
{
    public partial class Third : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Like",
                table: "UsersJokes",
                newName: "Liked");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Liked",
                table: "UsersJokes",
                newName: "Like");
        }
    }
}
