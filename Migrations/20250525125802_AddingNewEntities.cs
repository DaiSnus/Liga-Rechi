using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Liga_Rechi.Migrations
{
    /// <inheritdoc />
    public partial class AddingNewEntities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PartnershipBlocks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    MainText = table.Column<string>(type: "text", nullable: false),
                    Phone = table.Column<string>(type: "text", nullable: false),
                    ImageId = table.Column<int>(type: "integer", nullable: true),
                    Title1 = table.Column<string>(type: "text", nullable: false),
                    Text1 = table.Column<string>(type: "text", nullable: false),
                    Title2 = table.Column<string>(type: "text", nullable: false),
                    Text2 = table.Column<string>(type: "text", nullable: false),
                    Title3 = table.Column<string>(type: "text", nullable: false),
                    Text3 = table.Column<string>(type: "text", nullable: false),
                    Title4 = table.Column<string>(type: "text", nullable: false),
                    Text4 = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PartnershipBlocks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PartnershipBlocks_Files_ImageId",
                        column: x => x.ImageId,
                        principalTable: "Files",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "Showcases",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BannerFileId = table.Column<int>(type: "integer", nullable: true),
                    PhoneNumber = table.Column<string>(type: "text", nullable: false),
                    SocialLinks = table.Column<string>(type: "text", nullable: false),
                    CalendarSubtitle = table.Column<string>(type: "text", nullable: false),
                    CalendarLegend = table.Column<string>(type: "text", nullable: false),
                    IsAboutUsEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    AboutUsTitle1 = table.Column<string>(type: "text", nullable: false),
                    AboutUsText1 = table.Column<string>(type: "text", nullable: false),
                    AboutUsTitle2 = table.Column<string>(type: "text", nullable: false),
                    AboutUsText2 = table.Column<string>(type: "text", nullable: false),
                    AboutUsTitle3 = table.Column<string>(type: "text", nullable: false),
                    AboutUsText3 = table.Column<string>(type: "text", nullable: false),
                    IsResidentClubsEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    ResidentClubsSubtitle = table.Column<string>(type: "text", nullable: false),
                    IsPartnersEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    PartnershipBlockId = table.Column<int>(type: "integer", nullable: true),
                    City = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Showcases", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Showcases_Files_BannerFileId",
                        column: x => x.BannerFileId,
                        principalTable: "Files",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Showcases_PartnershipBlocks_PartnershipBlockId",
                        column: x => x.PartnershipBlockId,
                        principalTable: "PartnershipBlocks",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_PartnershipBlocks_ImageId",
                table: "PartnershipBlocks",
                column: "ImageId");

            migrationBuilder.CreateIndex(
                name: "IX_Showcases_BannerFileId",
                table: "Showcases",
                column: "BannerFileId");

            migrationBuilder.CreateIndex(
                name: "IX_Showcases_PartnershipBlockId",
                table: "Showcases",
                column: "PartnershipBlockId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Showcases");

            migrationBuilder.DropTable(
                name: "PartnershipBlocks");
        }
    }
}
