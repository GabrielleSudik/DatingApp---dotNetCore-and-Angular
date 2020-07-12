using Microsoft.EntityFrameworkCore.Migrations;

//this file was created when we ran dotnet ef migrations add InitialCreate
//it's the file that will create DB tables for us (or delete them).

//the info in this file comes from our Models. We have one model: Value.
//the model has Id and Name as properties. Note the auto incrementer.

//make this happen by applying this migration:
//"dotnet ef database update"

namespace DatingApp.API.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Values",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Values", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Values");
        }
    }
}
