using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Liga_Rechi.Migrations
{
    /// <inheritdoc />
    public partial class addedadmins : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CommunityFiles_Files_FileId",
                table: "CommunityFiles");

            migrationBuilder.DropForeignKey(
                name: "FK_ProjectFiles_Files_FileId",
                table: "ProjectFiles");

            migrationBuilder.DropForeignKey(
                name: "FK_RewardSkillExperiences_Rewards_RewardId",
                table: "RewardSkillExperiences");

            migrationBuilder.DropForeignKey(
                name: "FK_UserFiles_Files_FileId",
                table: "UserFiles");

            migrationBuilder.DropTable(
                name: "Rewards");

            migrationBuilder.DropColumn(
                name: "IsAdmin",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Role",
                table: "EventsParticipants");

            migrationBuilder.RenameColumn(
                name: "RewardId",
                table: "RewardSkillExperiences",
                newName: "RewardIssuanceId");

            migrationBuilder.RenameIndex(
                name: "IX_RewardSkillExperiences_RewardId",
                table: "RewardSkillExperiences",
                newName: "IX_RewardSkillExperiences_RewardIssuanceId");

            migrationBuilder.AddColumn<bool>(
                name: "IsSpecialized",
                table: "Skills",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Url",
                table: "Projects",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "RoleId",
                table: "EventsParticipants",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Url",
                table: "Communities",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "Admins",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FirstName = table.Column<string>(type: "text", nullable: false),
                    LastName = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    Password = table.Column<string>(type: "text", nullable: false),
                    Salt = table.Column<string>(type: "text", nullable: false),
                    City = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Admins", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RewardFiles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FileId = table.Column<int>(type: "integer", nullable: true),
                    RewardId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RewardFiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RewardFiles_Files_FileId",
                        column: x => x.FileId,
                        principalTable: "Files",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RewardFiles_RewardTemplates_RewardId",
                        column: x => x.RewardId,
                        principalTable: "RewardTemplates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RewardIssuance",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    Weight = table.Column<int>(type: "integer", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: true),
                    RewardTemplateId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RewardIssuance", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RewardIssuance_RewardTemplates_RewardTemplateId",
                        column: x => x.RewardTemplateId,
                        principalTable: "RewardTemplates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_RewardIssuance_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    Importance = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EventsParticipants_RoleId",
                table: "EventsParticipants",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_RewardFiles_FileId",
                table: "RewardFiles",
                column: "FileId");

            migrationBuilder.CreateIndex(
                name: "IX_RewardFiles_RewardId",
                table: "RewardFiles",
                column: "RewardId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_RewardIssuance_RewardTemplateId",
                table: "RewardIssuance",
                column: "RewardTemplateId");

            migrationBuilder.CreateIndex(
                name: "IX_RewardIssuance_UserId",
                table: "RewardIssuance",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_CommunityFiles_Files_FileId",
                table: "CommunityFiles",
                column: "FileId",
                principalTable: "Files",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_EventsParticipants_Roles_RoleId",
                table: "EventsParticipants",
                column: "RoleId",
                principalTable: "Roles",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectFiles_Files_FileId",
                table: "ProjectFiles",
                column: "FileId",
                principalTable: "Files",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RewardSkillExperiences_RewardIssuance_RewardIssuanceId",
                table: "RewardSkillExperiences",
                column: "RewardIssuanceId",
                principalTable: "RewardIssuance",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_UserFiles_Files_FileId",
                table: "UserFiles",
                column: "FileId",
                principalTable: "Files",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CommunityFiles_Files_FileId",
                table: "CommunityFiles");

            migrationBuilder.DropForeignKey(
                name: "FK_EventsParticipants_Roles_RoleId",
                table: "EventsParticipants");

            migrationBuilder.DropForeignKey(
                name: "FK_ProjectFiles_Files_FileId",
                table: "ProjectFiles");

            migrationBuilder.DropForeignKey(
                name: "FK_RewardSkillExperiences_RewardIssuance_RewardIssuanceId",
                table: "RewardSkillExperiences");

            migrationBuilder.DropForeignKey(
                name: "FK_UserFiles_Files_FileId",
                table: "UserFiles");

            migrationBuilder.DropTable(
                name: "Admins");

            migrationBuilder.DropTable(
                name: "RewardFiles");

            migrationBuilder.DropTable(
                name: "RewardIssuance");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropIndex(
                name: "IX_EventsParticipants_RoleId",
                table: "EventsParticipants");

            migrationBuilder.DropColumn(
                name: "IsSpecialized",
                table: "Skills");

            migrationBuilder.DropColumn(
                name: "Url",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "RoleId",
                table: "EventsParticipants");

            migrationBuilder.DropColumn(
                name: "Url",
                table: "Communities");

            migrationBuilder.RenameColumn(
                name: "RewardIssuanceId",
                table: "RewardSkillExperiences",
                newName: "RewardId");

            migrationBuilder.RenameIndex(
                name: "IX_RewardSkillExperiences_RewardIssuanceId",
                table: "RewardSkillExperiences",
                newName: "IX_RewardSkillExperiences_RewardId");

            migrationBuilder.AddColumn<bool>(
                name: "IsAdmin",
                table: "Users",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "Role",
                table: "EventsParticipants",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Rewards",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RewardTemplateId = table.Column<int>(type: "integer", nullable: true),
                    UserId = table.Column<int>(type: "integer", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Weight = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rewards", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Rewards_RewardTemplates_RewardTemplateId",
                        column: x => x.RewardTemplateId,
                        principalTable: "RewardTemplates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Rewards_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Rewards_RewardTemplateId",
                table: "Rewards",
                column: "RewardTemplateId");

            migrationBuilder.CreateIndex(
                name: "IX_Rewards_UserId",
                table: "Rewards",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_CommunityFiles_Files_FileId",
                table: "CommunityFiles",
                column: "FileId",
                principalTable: "Files",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectFiles_Files_FileId",
                table: "ProjectFiles",
                column: "FileId",
                principalTable: "Files",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_RewardSkillExperiences_Rewards_RewardId",
                table: "RewardSkillExperiences",
                column: "RewardId",
                principalTable: "Rewards",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_UserFiles_Files_FileId",
                table: "UserFiles",
                column: "FileId",
                principalTable: "Files",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }
    }
}
